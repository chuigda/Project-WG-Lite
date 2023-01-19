import { mat4, mat3, vec4, vec3 } from './3rd_parties/gl_matrix/index.mjs'
import { toRadian } from './3rd_parties/gl_matrix/common.mjs'

import { createFrameBuffer } from './glx/framebuffer_object.mjs'
import { createVertexBuffer } from './glx/vertex_buffer.mjs'
import { createShaderProgram } from './glx/shader_program.mjs'
import { createGouraudShader } from './shader/gouraud/index.mjs'
import { createFlatShader } from './shader/flat/index.mjs'
import { createTexturedShader } from './shader/textured/index.mjs'
import {
   loadOpaqueMesh,
   loadNonLightenedMesh
} from './wgc0310/mesh.mjs'
import material from './wgc0310/material.mjs'

const cx = {
   initialized: false,
   mesh: {},
   screenRenderer: null
}

const initializeGL = (gl, modelData) => {
   // initialize GL constants
   gl.enable(gl.DEPTH_TEST)
   gl.enable(gl.BLEND)
   gl.enable(gl.CULL_FACE)
   gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

   // initialize shaders
   cx.commonShader = createGouraudShader(gl)
   cx.flatShader = createFlatShader(gl)
   cx.texturedShader = createTexturedShader(gl)

   // initialize objects
   {
      const vertexCoordPos = cx.commonShader.getAttribLocation(gl, 'aVertexCoord')
      const vertexNormalPos = cx.commonShader.getAttribLocation(gl, 'aVertexNormal')
      loadOpaqueMesh(gl, cx.mesh, modelData, vertexCoordPos, vertexNormalPos)
   }

   {
      const vertexCoordPos = cx.flatShader.getAttribLocation(gl, 'aVertexCoord')
      loadNonLightenedMesh(gl, cx.mesh, modelData, vertexCoordPos)
   }

   {
      const vertexCoordPos = cx.texturedShader.getAttribLocation(gl, 'aVertexCoord')
      const uvCoordPos = cx.texturedShader.getAttribLocation(gl, 'aUVCoord')

      cx.mesh.screen = createVertexBuffer(
         gl,
         [
            /* vertex coord */       /* uv */
            -12.5,  18.75 / 2, 0.0,  0.0, 1.0,
             12.5, -18.75 / 2, 0.0,  1.0, 0.0,
             12.5,  18.75 / 2, 0.0,  1.0, 1.0,

            -12.5,  18.75 / 2, 0.0,  0.0, 1.0,
            -12.5, -18.75 / 2, 0.0,  0.0, 0.0,
             12.5, -18.75 / 2, 0.0,  1.0, 0.0
         ],
         {
            stride: 5,
            attributes: [
               { position: vertexCoordPos, size: 3, offset: 0 },
               { position: uvCoordPos, size: 2, offset: 3 }
            ]
         }
      )
   }

   // initialize texture
   cx.screenFrameBuffer = createFrameBuffer(gl)

   cx.startTime = Date.now()
   cx.initialized = true
}

const resizeGL = (gl, w, h) => {
   cx.w = w
   cx.h = h

   const projection = mat4.create()
   mat4.perspective(projection, 45, w / h, 0.1, 100.0)
   cx.commonShader.useProgram(gl)
   cx.commonShader.uniformMatrix4fv(gl, 'projection', false, projection)

   cx.flatShader.useProgram(gl)
   cx.flatShader.uniformMatrix4fv(gl, 'projection', false, projection)

   cx.texturedShader.useProgram(gl)
   cx.texturedShader.uniformMatrix4fv(gl, 'projection', false, projection)
}

const paintGL = (gl, statusRef) => {
   const { status } = statusRef

   cx.screenFrameBuffer.bind(gl)
   gl.clearColor(0.0, 0.0, 0.0, 1.0)
   gl.clear(gl.COLOR_BUFFER_BIT)
   if (cx.screenRenderer) {
      cx.screenRenderer(gl)
   }
   cx.screenFrameBuffer.release(gl)

   gl.viewport(0, 0, cx.w, cx.h)
   gl.clearColor(...status.webgl.clearColor)
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
      material.plastic.apply(gl, cx.commonShader)
      cx.mesh.waist.draw(gl)

      mat4.translate(modelView, modelView, [0.0, 1.0, 0.0])
      mat4.rotateZ(modelView, modelView, toRadian(status.headStatus.rotationZ / 10.0))
      mat4.rotateX(modelView, modelView, toRadian(status.headStatus.rotationX / 10.0))
      cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
      material.blackPlastic.apply(gl, cx.commonShader)
      cx.mesh.abdomen.draw(gl)

      mat4.translate(modelView, modelView, [0.0, 1.0, 0.0])
   }

   mat4.translate(modelView, modelView, [0.0, 6.0, 0.0])

   const colorTimerMatrix = mat4.clone(modelView)
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.chestBox.draw(gl)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.chestPlate.draw(gl)
   material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.power.draw(gl)
   material.brass.apply(gl, cx.commonShader)
   cx.mesh.powerPin.draw(gl)

   const rightArmMatrix = {}
   const leftArmMatrix = {}

   drawArm(gl, modelView, status.armStatus.right, 1.0, rightArmMatrix)
   drawArm(gl, modelView, status.armStatus.left, -1.0, leftArmMatrix)

   mat4.translate(modelView, modelView, [0.0, 12.875, 0.0])
   mat4.rotateY(modelView, modelView, toRadian(status.headStatus.rotationY / 2.0))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.wheel.draw(gl)

   mat4.rotateY(modelView, modelView, toRadian(status.headStatus.rotationY / 2.0))
   mat4.translate(modelView, modelView, [0.0, 0.375, 0.0])
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.monitor.draw(gl)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.monitorIntake.draw(gl)

   mat4.translate(modelView, modelView, [0.0, 9.25 + 1.875, 5.25])
   cx.texturedShader.useProgram(gl)
   cx.texturedShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.screenFrameBuffer.bindTexture(gl)
   cx.mesh.screen.draw(gl)

   cx.flatShader.useProgram(gl)
   cx.flatShader.uniformMatrix4fv(gl, 'modelView', false, colorTimerMatrix)
   if (status.colorTimer.status === 'blue') {
      cx.flatShader.uniform3fv(gl, 'color', [0.25, 1.0, 1.0])
   } else if (status.colorTimer.status === 'blink') {
      const millis = Date.now() - cx.startTime
      const blink = Math.floor(millis / status.colorTimer.blinkDuration) % 2 === 0
      if (blink) {
         cx.flatShader.uniform3fv(gl, 'color', [1.0, 0.25, 0.25])
      } else {
         cx.flatShader.uniform3fv(gl, 'color', [0.4, 0.4, 0.4])
      }
   } else {
      cx.flatShader.uniform3fv(gl, 'color', [0.4, 0.4, 0.4])
   }
   cx.mesh.colorTimer.draw(gl)
}

const setScreenRenderer = screenRenderer => {
   cx.screenRenderer = screenRenderer
}

const drawArm = (gl, modelView, armStatus, coeff, outputMatrix) => {
   modelView = mat4.clone(modelView)
   mat4.scale(modelView, modelView, [coeff, 1.0, coeff])

   mat4.translate(modelView, modelView, [14.5, 7.5, 0.0])
   mat4.rotateX(modelView, modelView, toRadian(coeff * armStatus.rotation[0]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.shoulderConnector.draw(gl)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.shoulderPlate.draw(gl)

   mat4.translate(modelView, modelView, [4.75, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(armStatus.rotation[1] / 2))

   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.wheelSmall.draw(gl)

   mat4.rotateZ(modelView, modelView, toRadian(armStatus.rotation[1] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   outputMatrix.bigArm = mat4.clone(modelView)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.bigArm.draw(gl)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.bigArmCover.draw(gl)

   mat4.translate(modelView, modelView, [20.0, 0.0, 0.0])
   mat4.rotateX(modelView, modelView, toRadian(-1.0 * armStatus.rotation[2]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   material.blackPlastic.apply(gl, cx.commonShader)
   cx.mesh.bigArmConnector.draw(gl)

   mat4.translate(modelView, modelView, [4.5, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[3] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.mesh.wheelSmall.draw(gl)

   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[3] / 2))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   outputMatrix.smallArm = mat4.clone(modelView)
   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.smallArm.draw(gl)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.smallArmCover.draw(gl)

   mat4.translate(modelView, modelView, [25.0, 0.0, 0.0])
   mat4.rotateZ(modelView, modelView, toRadian(coeff * armStatus.rotation[4]))
   cx.commonShader.uniformMatrix4fv(gl, 'modelView', false, modelView)

   material.chrome.apply(gl, cx.commonShader)
   cx.mesh.claw.draw(gl)
   material.plastic.apply(gl, cx.commonShader)
   cx.mesh.clawCover.draw(gl)
}

const glm = { mat3, mat4, vec3, vec4, toRadian }
const glx = { createFrameBuffer, createVertexBuffer, createShaderProgram }

export {
   initializeGL,
   resizeGL,
   paintGL,
   setScreenRenderer,

   glm,
   glx
}
