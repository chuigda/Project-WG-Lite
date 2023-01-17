export const createVertexBuffer = (gl, data, bufferDesc, glType, glArrayType) => {
   glType = glType || gl.FLOAT
   glArrayType = glArrayType || Float32Array

   let float32Array = data
   if (float32Array.constructor === Array) {
      float32Array = new glArrayType(data)
   }

   const buffer = gl.createBuffer()
   gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
   gl.bufferData(gl.ARRAY_BUFFER, float32Array, gl.STATIC_DRAW)
   gl.bindBuffer(gl.ARRAY_BUFFER, null)

   return {
      buffer,
      bufferDesc,
      count: data.length / bufferDesc.stride,

      draw(gl, mode) {
         mode = mode ?? gl.TRIANGLES

         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
         for (const { position, size, offset } of this.bufferDesc.attributes) {
            gl.enableVertexAttribArray(position)
            gl.vertexAttribPointer(
               position,
               size,
               glType,
               false,
               this.bufferDesc.stride * glArrayType.BYTES_PER_ELEMENT,
               offset * glArrayType.BYTES_PER_ELEMENT
            )
         }
         gl.drawArrays(mode, 0, this.count)
         gl.bindBuffer(gl.ARRAY_BUFFER, null)
      }
   }
}
