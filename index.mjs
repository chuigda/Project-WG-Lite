import { initializeGL, paintGL, resizeGL } from './src/main.mjs'
import { initStatus } from './src/wgc0310'

const statusRef = { status: initStatus() }

const init = () => {
   const canvas = $('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.5)
   canvas.height = Math.round(window.innerHeight * 0.5)
   canvas.style.cssText = `width: ${canvas.width / 2}px; height: ${canvas.height / 2}px;`

   const gl = canvas.getContext('webgl')
   initializeGL(gl)
   resizeGL(gl, canvas.width, canvas.height)

   $('gl-vendor').innerText = gl.getParameter(gl.VENDOR)
   $('gl-version').innerText = gl.getParameter(gl.VERSION)
   $('gl-renderer').innerText = gl.getParameter(gl.RENDERER)
   $('gl-extensions').innerText = gl.getSupportedExtensions().join(' ')

   $('statusEdit').value = JSON.stringify(statusRef.status, null, 3)
   $('submit').addEventListener('click', () => {
      statusRef.status = initStatus(JSON.parse($('statusEdit').value))
   })
   $('reset').addEventListener('click', () => {
      statusRef.status = initStatus()
      $('statusEdit').value = JSON.stringify(statusRef.status, null, 3)
   })
}

const main = () => {
   const gl = $('mainCanvas').getContext('webgl')
   paintGL(gl, statusRef)

   requestAnimationFrame(main)
}

window.onload = () => {
   init()
   requestAnimationFrame(main)
}

addEventListener('resize', () => {
   const canvas = $('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.5)
   canvas.height = Math.round(window.innerHeight * 0.5)
   canvas.style.cssText = `width: ${canvas.width / 2}px; height: ${canvas.height / 2}px;`

   const gl = canvas.getContext('webgl')
   resizeGL(gl, canvas.width, canvas.height)
})
