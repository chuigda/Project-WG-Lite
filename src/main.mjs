import { mat4 } from './3rd_parties/gl_matrix/index.mjs'
import { createShaderProgram } from './glx/shader_program.mjs'
import { createVertexBuffer } from './glx/vertex_buffer.mjs'

import vsSource from './shader/gouraud/vertex.mjs'
import fsSource from './shader/gouraud/fragment.mjs'
import vertices from './model/monitor.mjs'

const cx = {
   initialized: false,
   rotation: 0,
   mesh: {}
}

export const initializeGL = gl => {
   // initialize GL constants
   gl.enable(gl.DEPTH_TEST)

   // initialize shaders
   const shaderProgram = createShaderProgram(gl, vsSource, fsSource)
   cx.shaderProgram = shaderProgram

   shaderProgram.useProgram(gl)

   // initialize uniform
   shaderProgram.uniform3fv(gl, 'material.ambient', [0.2, 0.2, 0.2])
   shaderProgram.uniform3fv(gl, 'material.diffuse', [0.55, 0.55, 0.55])

   // initialize objects
   const vertexCoordPos = shaderProgram.getAttribLocation(gl, 'aVertexCoord')
   const vertexNormalPos = shaderProgram.getAttribLocation(gl, 'aVertexNormal')

   cx.mesh.monitor = createVertexBuffer(gl, vertices, {
      stride: 6,
      attributes: [
         { position: vertexCoordPos, size: 3, offset: 0 },
         { position: vertexNormalPos, size: 3, offset: 3 }
      ]
   })

   cx.initialized = true
}

export const resizeGL = (gl, w, h) => {
   gl.viewport(0, 0, w, h)

   cx.shaderProgram.useProgram(gl)
   const projection = mat4.create()
   mat4.perspective(projection, 45, w / h, 0.1, 1000.0)
   cx.shaderProgram.uniformMatrix4fv(gl, 'projection', false, projection)
}

export const paintGL = gl => {
   gl.clearColor(0, 0, 0, 1)
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

   if (!cx.initialized) {
      return
   }

   cx.rotation += 1.0

   cx.shaderProgram.useProgram(gl)

   const modelView = mat4.create()
   mat4.scale(modelView, modelView, [0.01, 0.01, 0.01])
   mat4.translate(modelView, modelView, [0.0, 0.0, -75.0])
   mat4.rotate(modelView, modelView, cx.rotation * Math.PI / 180, [0, 1, 0])
   cx.shaderProgram.uniformMatrix4fv(gl, 'modelView', false, modelView)
   cx.mesh.monitor.draw(gl, gl.TRIANGLES, vertices.length / 6)
}
