export const createShaderProgram = (gl, vsSource, fsSource) => {
   const vertexShader = gl.createShader(gl.VERTEX_SHADER)
   gl.shaderSource(vertexShader, vsSource)
   gl.compileShader(vertexShader)
   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(`ERROR compiling vertex shader: ${gl.getShaderInfoLog(vertexShader)}`)
   }

   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
   gl.shaderSource(fragmentShader, fsSource)
   gl.compileShader(fragmentShader)
   if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(`ERROR compiling fragment shader: ${gl.getShaderInfoLog(vertexShader)}`)
   }

   const program = gl.createProgram()
   gl.attachShader(program, vertexShader)
   gl.attachShader(program, fragmentShader)
   gl.linkProgram(program)

   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`ERROR linking shader program: ${gl.getShaderInfoLog(vertexShader)}`)
   }

   gl.deleteShader(vertexShader)
   gl.deleteShader(fragmentShader)

   return {
      program,
      attributeLocations: {},
      uniformLocations: {},
      useProgram(gl) {
         gl.useProgram(this.program)
      },
      getAttribLocation(gl, name) {
         if (!this.attributeLocations[name]) {
            this.attributeLocations[name] = gl.getAttribLocation(this.program, name)
         }
         return this.attributeLocations[name]
      },
      getUniformLocation(gl, name) {
         if (!this.uniformLocations[name]) {
            this.uniformLocations[name] = gl.getUniformLocation(this.program, name)
         }
         return this.uniformLocations[name]
      },
      enableVertexAttribArray(gl, name) {
         gl.enableVertexAttribArray(this.getAttribLocation(gl, name))
      },
      vertexAttribPointer(gl, name, size, type, normalized, stride, offset) {
         gl.vertexAttribPointer(this.getAttribLocation(gl, name), size, type, normalized, stride, offset)
      },
      uniformMatrix4fv(gl, name, transpose, value) {
         gl.uniformMatrix4fv(this.getUniformLocation(gl, name), transpose, value)
      },
      uniform3fv(gl, name, value) {
         gl.uniform3fv(this.getUniformLocation(gl, name), value)
      },
      uniform1f(gl, name, value) {
         gl.uniform1f(this.getUniformLocation(gl, name), value)
      }
   }
}
