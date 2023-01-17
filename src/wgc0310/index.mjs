import { initEntityStatus } from './entity_status.mjs'
import { initHeadStatus } from './head_status.mjs'
import { initArmStatus } from './arm_status.mjs'

export const initStatus = inputData => ({
   webgl: inputData?.webgl ?? {
      clearColor: [0.0, 0.0, 0.0, 0.0],
   },
   entityStatus: initEntityStatus(inputData?.entityStatus),
   headStatus: initHeadStatus(inputData?.headStatus),
   armStatus: {
      left: initArmStatus(inputData?.armStatus.left),
      right: initArmStatus(inputData?.armStatus.right)
   },
   colorTimer: inputData?.colorTimer ?? {
      status: 'blue',
      blinkDuration: 500
   }
})
