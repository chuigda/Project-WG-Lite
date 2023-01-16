import { createVertexBuffer } from '../glx/vertex_buffer.mjs'

// opaque
import wheelMesh from '../model/wheel.mjs'
import monitorMesh from '../model/monitor.mjs'
import monitorIntake from '../model/monitor-intake.mjs'

import chestBoxMesh from '../model/chest-box.mjs'
import chestPlateMesh from '../model/chest-plate.mjs'
import powerMesh from '../model/power.mjs'
import powerPinMesh from '../model/power-pin.mjs'

import abdomenMesh from '../model/abdomen.mjs'
import waistMesh from '../model/waist.mjs'

import shoulderConnectorMesh from '../model/shoulder-connector.mjs'
import shoulderPlateMesh from '../model/shoulder-plate.mjs'
import bigArmMesh from '../model/big-arm.mjs'
import bigArmCoverMesh from '../model/big-arm-cover.mjs'
import bigArmConnectorMesh from '../model/big-arm-connector.mjs'
import smallArmMesh from '../model/small-arm.mjs'
import smallArmCoverMesh from '../model/small-arm-cover.mjs'
import wheelSmallMesh from '../model/wheel-small.mjs'
import clawMesh from '../model/claw.mjs'
import clawCoverMesh from '../model/claw-cover.mjs'

// translucent
import colorTimerShellMesh from '../model/ber-shell.mjs'

// non-lightened (self-emissive)
import colorTimerMesh from '../model/ber.mjs'

export const loadOpaqueMesh = (gl, mesh, vertexCoordPos, vertexNormalPos) => {
   const opaqueDesc = {
      stride: 6,
      attributes: [
         { position: vertexCoordPos, size: 3, offset: 0 },
         { position: vertexNormalPos, size: 3, offset: 3 }
      ]
   }

   mesh.wheel = createVertexBuffer(gl, wheelMesh, opaqueDesc)
   mesh.monitor = createVertexBuffer(gl, monitorMesh, opaqueDesc)
   mesh.monitorIntake = createVertexBuffer(gl, monitorIntake, opaqueDesc)

   mesh.chestBox = createVertexBuffer(gl, chestBoxMesh, opaqueDesc)
   mesh.chestPlate = createVertexBuffer(gl, chestPlateMesh, opaqueDesc)
   mesh.power = createVertexBuffer(gl, powerMesh, opaqueDesc)
   mesh.powerPin = createVertexBuffer(gl, powerPinMesh, opaqueDesc)

   mesh.abdomen = createVertexBuffer(gl, abdomenMesh, opaqueDesc)
   mesh.waist = createVertexBuffer(gl, waistMesh, opaqueDesc)

   mesh.shoulderConnector = createVertexBuffer(gl, shoulderConnectorMesh, opaqueDesc)
   mesh.shoulderPlate = createVertexBuffer(gl, shoulderPlateMesh, opaqueDesc)
   mesh.bigArm = createVertexBuffer(gl, bigArmMesh, opaqueDesc)
   mesh.bigArmCover = createVertexBuffer(gl, bigArmCoverMesh, opaqueDesc)
   mesh.bigArmConnector = createVertexBuffer(gl, bigArmConnectorMesh, opaqueDesc)
   mesh.smallArm = createVertexBuffer(gl, smallArmMesh, opaqueDesc)
   mesh.smallArmCover = createVertexBuffer(gl, smallArmCoverMesh, opaqueDesc)
   mesh.wheelSmall = createVertexBuffer(gl, wheelSmallMesh, opaqueDesc)
   mesh.claw = createVertexBuffer(gl, clawMesh, opaqueDesc)
   mesh.clawCover = createVertexBuffer(gl, clawCoverMesh, opaqueDesc)
}

export const loadTranslucentMesh = (gl, mesh, vertexCoordPos, vertexNormalPos) => {
   const translucentDesc = {
      stride: 6,
      attributes: [
         { position: vertexCoordPos, size: 3, offset: 0 },
         { position: vertexNormalPos, size: 3, offset: 3 }
      ]
   }

   mesh.colorTimerShell = createVertexBuffer(gl, colorTimerShellMesh, translucentDesc)
}

export const loadNonLightenedMesh = (gl, mesh, vertexCoordPos, vertexNormalPos) => {
   const nonLightenedDesc = {
      stride: 6,
      attributes: [
         { position: vertexCoordPos, size: 3, offset: 0 },
         { position: vertexNormalPos, size: 3, offset: 3 }
      ]
   }

   mesh.colorTimer = createVertexBuffer(gl, colorTimerMesh, nonLightenedDesc)
}
