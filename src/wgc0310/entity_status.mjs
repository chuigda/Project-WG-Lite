import { mat4 } from '../3rd_parties/gl_matrix/index.mjs'
import { toRadian } from '../3rd_parties/gl_matrix/common.mjs'

export const initEntityStatus = data => {
   data = data ?? {
      translate: [0.0, 25.0, 75.0],
      rotation: [10.0, 0.0, 0.0]
   }

   return {
      ...data,

      toMatrix(matrix) {
         mat4.translate(matrix, matrix, this.translate.map(x => -x))
         mat4.rotateX(matrix, matrix, toRadian(this.rotation[0]))
         mat4.rotateY(matrix, matrix, toRadian(this.rotation[1]))
         mat4.rotateZ(matrix, matrix, toRadian(this.rotation[2]))
      },
      reset() {
         this.translate = [0.0, 25.0, 75.0]
         this.rotation = [10.0, 0.0, 0.0]
      }
   }
}
