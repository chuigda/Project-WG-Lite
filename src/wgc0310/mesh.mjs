import { createVertexBuffer } from '../glx/vertex_buffer.mjs'

export const loadOpaqueMesh = (gl, mesh, verticesData, vertexCoordPos, vertexNormalPos) => {
   const {
      wheelMesh,
      monitorMesh,
      monitorIntake,
      chestBoxMesh,
      chestPlateMesh,
      powerMesh,
      powerPinMesh,
      abdomenMesh,
      waistMesh,
      shoulderConnectorMesh,
      shoulderPlateMesh,
      bigArmMesh,
      bigArmCoverMesh,
      bigArmConnectorMesh,
      smallArmMesh,
      smallArmCoverMesh,
      wheelSmallMesh,
      clawMesh,
      clawCoverMesh
   } = verticesData

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

export const loadNonLightenedMesh = (gl, mesh, verticesData, vertexCoordPos) => {
   const { colorTimerMesh } = verticesData
   const nonLightenedDesc = {
      stride: 6,
      attributes: [ { position: vertexCoordPos, size: 3, offset: 0 } ]
   }

   mesh.colorTimer = createVertexBuffer(gl, colorTimerMesh, nonLightenedDesc)
}
