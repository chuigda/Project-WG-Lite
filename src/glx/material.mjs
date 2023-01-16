export const createMaterial = (ambient, diffuse) => {
   return {
      ambient,
      diffuse,

      apply(gl, shaderProgram) {
         shaderProgram.uniform3fv(gl, 'material.ambient', ambient)
         shaderProgram.uniform3fv(gl, 'material.diffuse', diffuse)
      }
   }
}
