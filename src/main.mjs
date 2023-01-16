import { glMatrix, mat4 } from './3rd_parties/gl_matrix/index.mjs'

import { createShaderProgram } from './glx/shader_program.mjs'
import { loadOpaqueMesh, loadNonLightenedMesh, loadTranslucentMesh } from './wgc0310/mesh.mjs'
import { loadMaterial } from './wgc0310/material.mjs'

import vsSource from './shader/gouraud/vertex.mjs'
import fsSource from './shader/gouraud/fragment.mjs'

const { toRadian } = glMatrix

const cx = {
   initialized: false,
   mesh: {},
   material: loadMaterial()
}

export const initializeGL = gl => {
   console.log(`GL_VENDOR = ${gl.getParameter(gl.VENDOR)}`)
   console.log(`GL_VERSION = ${gl.getParameter(gl.VERSION)}`)
   console.log(`GL_RENDERER = ${gl.getParameter(gl.RENDERER)}`)
   console.log(`GL_EXTENSIONS = ${gl.getSupportedExtensions().join(' ')}`)

   // initialize GL constants
   gl.enable(gl.DEPTH_TEST)

   // initialize shaders
   cx.commonShader = createShaderProgram(gl, vsSource, fsSource)

   // initialize objects
   {
      const vertexCoordPos = cx.commonShader.getAttribLocation(gl, 'aVertexCoord')
      const vertexNormalPos = cx.commonShader.getAttribLocation(gl, 'aVertexNormal')
      loadOpaqueMesh(gl, cx.mesh, vertexCoordPos, vertexNormalPos)
   }

   cx.initialized = true
}

export const resizeGL = (gl, w, h) => {
   gl.viewport(0, 0, w, h)

   cx.commonShader.useProgram(gl)
   const projection = mat4.create()
   mat4.perspective(projection, 45, w / h, 0.1, 100.0)
   cx.commonShader.uniformMatrix4fv(gl, 'projection', false, projection)
}

export const paintGL = (gl, status) => {
   gl.clearColor(0, 0, 0, 1)
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

   if (!cx.initialized) {
      return
   }

   cx.commonShader.useProgram(gl)

   const modelView = mat4.create()
   mat4.scale(modelView, modelView, [0.01, 0.01, 0.01])
   status.entityStatus.toMatrix(modelView)
   mat4.translate(modelView, modelView, [0.0, -12.0, 0.0])

   for (let i = 0; i < 10; i++) {
      cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
      cx.material.plastic.apply(gl, cx.commonShader)
      cx.mesh.waist.draw(gl)

      mat4.translate(modelView, modelView, [0.0, 1.0, 0.0])
      mat4.rotateZ(modelView, modelView, toRadian(status.headStatus.rotationZ / 10.0))
      mat4.rotateX(modelView, modelView, toRadian(status.headStatus.rotationX / 10.0))
      cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
      cx.material.blackPlastic.apply(gl, cx.commonShader)
      cx.mesh.abdomen.draw(gl)

      mat4.translate(modelView, modelView, [0.0, 1.0, 0.0])
   }

   mat4.translate(modelView, modelView, [0.0, 6.0, 0.0])
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.chestBox.draw(gl)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.chestPlate.draw(gl)
   cx.material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.power.draw(gl)
   cx.material.brass.apply(gl, cx.commonShader)
   cx.mesh.powerPin.draw(gl)

   const rightArmMatrix = {}
   const leftArmMatrix = {}

   drawArm(gl, modelView, status.armStatus.right, 1.0, rightArmMatrix)
   drawArm(gl, modelView, status.armStatus.left, -1.0, leftArmMatrix)

   mat4.translate(modelView, modelView, [0.0, 12.875, 0.0])
   mat4.rotateX(modelView, modelView, toRadian(status.headStatus.rotationY / 2.0))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.wheel.draw(gl)

   mat4.rotateX(modelView, modelView, toRadian(status.headStatus.rotationY / 2.0))
   mat4.translate(modelView, modelView, [0.0, 0.375, 0.0])
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.monitor.draw(gl)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.monitorIntake.draw(gl)
}

const drawArm = (gl, modelView, armStatus, coeff, outputMatrix) => {
   modelView = mat4.clone(modelView)
   mat4.scale(modelView, modelView, [coeff, 1.0, coeff])

   mat4.translate(modelView, modelView, [14.5, 7.5, 0.0])
   mat4.rotateX(modelView, modelView, toRadian(coeff * armStatus.rotation[0]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.shoulderConnector.draw(gl)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.shoulderPlate.draw(gl)

   mat4.translate(modelView, modelView, [4.75, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(armStatus.rotation[1] / 2))

   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.wheelSmall.draw(gl)

   mat4.rotateZ(modelView, modelView, toRadian(armStatus.rotation[1] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   outputMatrix.bigArm = mat4.clone(modelView)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.bigArm.draw(gl)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.bigArmCover.draw(gl)

   mat4.translate(modelView, modelView, [20.0, 0.0, 0.0])
   mat4.rotateX(modelView, modelView, toRadian(-1.0 * armStatus.rotation[2]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   cx.material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.bigArmConnector.draw(gl)

   mat4.translate(modelView, modelView, [4.5, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[3] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.mesh.wheelSmall.draw(gl)

   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[3] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   outputMatrix.smallArm = mat4.clone(modelView)
   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.smallArm.draw(gl)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.smallArmCover.draw(gl)

   mat4.translate(modelView, modelView, [10.0, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[4]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   cx.material.chrome.apply(gl, cx.commonShader)
   cx.mesh.claw.draw(gl)
   cx.material.plastic.apply(gl, cx.commonShader)
   cx.mesh.clawCover.draw(gl)
}
