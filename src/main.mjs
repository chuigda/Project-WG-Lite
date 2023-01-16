import { mat4 } from './3rd_parties/gl_matrix/index.mjs'
import { createShaderProgram } from './glx/shader_program.mjs'

import vsSource from './shader/phong/vertex.mjs'
import fsSource from './shader/phong/fragment.mjs'
import vertices from './model/monitor.mjs'

const cx = {
   initialized: false,
   rotation: 0
}

export const initializeGL = gl => {
   // initialize GL constants
   gl.enable(gl.DEPTH_TEST)

   // initialize shaders
   const shaderProgram = createShaderProgram(gl, vsSource, fsSource)
   cx.shaderProgram = shaderProgram

   shaderProgram.useProgram(gl)
   shaderProgram.enableVertexAttribArray(gl, 'aVertexCoord')
   shaderProgram.enableVertexAttribArray(gl, 'aVertexNormal')

   cx.vertexBufferObject = gl.createBuffer()
   gl.bindBuffer(gl.ARRAY_BUFFER, cx.vertexBufferObject)
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
   shaderProgram.vertexAttribPointer(gl, 'aVertexCoord', 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0)
   shaderProgram.vertexAttribPointer(gl, 'aVertexNormal', 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)

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

   gl.bindBuffer(gl.ARRAY_BUFFER, cx.vertexBufferObject)
   gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6)
}
