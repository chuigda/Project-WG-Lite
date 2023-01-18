import { initializeGL, paintGL, resizeGL, setScreenRenderer } from './src/main.mjs'
import { initStatus } from './src/wgc0310/index.mjs'
import { createShaderProgram } from './src/glx/shader_program.mjs'
import { createVertexBuffer } from './src/glx/vertex_buffer.mjs'

import { loadModelAsync } from './load-model.mjs'

const statusRef = { status: initStatus() }

const cx = {}

const init = modelData => {
   const canvas = $('main-canvas')
   canvas.width = 800
   canvas.height = 600
   canvas.style.cssText = `width: 800px; height: 600px`

   const gl = canvas.getContext('webgl', { antialias: true })
   initializeGL(gl, modelData)
   resizeGL(gl, canvas.width, canvas.height)

   $('gl-vendor').innerText = gl.getParameter(gl.VENDOR)
   $('gl-version').innerText = gl.getParameter(gl.VERSION)
   $('gl-renderer').innerText = gl.getParameter(gl.RENDERER)
   $('gl-extensions').innerText = gl.getSupportedExtensions().join(' ')

   $('status-edit').value = JSON.stringify(statusRef.status, null, 3)
   $('submit').addEventListener('click', () => {
      statusRef.status = initStatus(JSON.parse($('status-edit').value))
   })
   $('reset').addEventListener('click', () => {
      statusRef.status = initStatus()
      $('status-edit').value = JSON.stringify(statusRef.status, null, 3)
   })

   setScreenRenderer(gl => {
      const vsSource = String.raw`
precision mediump float;

attribute vec2 aVertexCoord;
attribute vec3 aVertexColor;

varying vec3 vertexColor;

void main() {
  vertexColor = aVertexColor;
  gl_Position = vec4(aVertexCoord, 0.0, 1.0);
}
`

      const fsSource = String.raw`
precision mediump float;

varying vec3 vertexColor;

void main() {
  gl_FragColor = vec4(vertexColor, 1.0);
}
`
      if (!cx.extraShader) {
         cx.extraShader = createShaderProgram(gl, vsSource, fsSource)

         const vertexCoordPos = cx.extraShader.getAttribLocation(gl, 'aVertexCoord')
         const vertexColorPos = cx.extraShader.getAttribLocation(gl, 'aVertexColor')
         cx.buffer = createVertexBuffer(
            gl,
            [
               /* coord */  /* color */
               -1.0, -1.0,  1.0, 0.0, 0.0,
                1.0, -1.0,  0.0, 1.0, 0.0,
               -1.0,  1.0,  0.0, 0.0, 1.0,

               -1.0,  1.0,  0.0, 0.0, 1.0,
                1.0, -1.0,  0.0, 1.0, 0.0,
                1.0,  1.0,  1.0, 1.0, 0.0
            ],
            {
               stride: 5,
               attributes: [
                  { position: vertexCoordPos, size: 2, offset: 0 },
                  { position: vertexColorPos, size: 3, offset: 2 }
               ]
            }
         )
      }

      cx.extraShader.useProgram(gl)
      cx.buffer.draw(gl)
   })
}

const main = () => {
   const gl = $('main-canvas').getContext('webgl')
   paintGL(gl, statusRef)

   requestAnimationFrame(main)
}

window.onload = async () => {
   const modelData = await loadModelAsync()
   init(modelData)

   $('control-ui').style.cssText = ''

   requestAnimationFrame(main)
}
