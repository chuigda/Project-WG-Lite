import { initializeGL, paintGL, resizeGL } from './src/main.mjs'

const init = () => {
   const canvas = document.getElementById('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.8)
   canvas.height = Math.round(window.innerHeight * 0.8)

   const gl = canvas.getContext('webgl')
   initializeGL(gl)
   resizeGL(gl, canvas.width, canvas.height)
}

const main = () => {
   const cx = document.getElementById('mainCanvas').getContext('webgl')
   paintGL(cx)

   requestAnimationFrame(main)
}

window.onload = () => {
   init()
   requestAnimationFrame(main)
}

addEventListener('resize', () => {
   const canvas = document.getElementById('mainCanvas')
   canvas.width = Math.round(window.innerWidth * 0.8)
   canvas.height = Math.round(window.innerHeight * 0.8)

   const gl = canvas.getContext('webgl')
   resizeGL(gl, canvas.width, canvas.height)
})
