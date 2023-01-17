export const initArmStatus = data => {
   data = data ?? {
      rotation: [0.0, -90.0, 0.0, 0.0, 0.0]
   }

   return {
      ...data,

      reset() {
         this.rotation = [0.0, -90.0, 0.0, 0.0, 0.0]
      }
   }
}

