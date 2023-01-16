import { initEntityStatus } from './entity_status.mjs'
import { initHeadStatus } from './head_status.mjs'
import { initArmStatus } from './arm_status.mjs'

export const initStatus = () => ({
   entityStatus: initEntityStatus(),
   headStatus: initHeadStatus(),
   armStatus: {
      left: initArmStatus(),
      right: initArmStatus()
   }
})
