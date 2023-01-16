export const createFrameBuffer = gl => {
   const fbo = gl.createFramebuffer()
   gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

   const texture = gl.createTexture()
   gl.bindTexture(gl.TEXTURE_2D, texture)
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 640, 480, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
   gl.bindTexture(gl.TEXTURE_2D, null)

   gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

   gl.bindFramebuffer(gl.FRAMEBUFFER, null)

   return {
      fbo,
      texture,

      bind(gl) {
         gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
         gl.viewport(0, 0, 640, 480)
      },
      release(gl) {
         gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      },
      bindTexture(gl) {
         gl.bindTexture(gl.TEXTURE_2D, this.texture)
      }
   }
}
