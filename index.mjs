import { initializeGL, paintGL, resizeGL } from './src/main.mjs'
import { initStatus } from './src/wgc0310'

const init = () => {
   const canvas = document.getElementById('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.5)
   canvas.height = Math.round(window.innerHeight * 0.5)
   canvas.style.cssText = `width: ${canvas.width / 2}px; height: ${canvas.height / 2}px;`

   const gl = canvas.getContext('webgl')
   initializeGL(gl)
   resizeGL(gl, canvas.width, canvas.height)
}

const status = initStatus()

const main = () => {
   const cx = document.getElementById('mainCanvas').getContext('webgl')
   paintGL(cx, status)

   requestAnimationFrame(main)
}

window.onload = () => {
   init()
   requestAnimationFrame(main)
}

addEventListener('resize', () => {
   const canvas = document.getElementById('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.5)
   canvas.height = Math.round(window.innerHeight * 0.5)
   canvas.style.cssText = `width: ${canvas.width / 2}px; height: ${canvas.height / 2}px;`

   const gl = canvas.getContext('webgl')
   resizeGL(gl, canvas.width, canvas.height)
})
