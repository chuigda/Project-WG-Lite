const updateLoadIndicator = (currentItem, currentIdx, totalCount) => {
   $('load-indicator').innerHTML = `<code>正在加载 ${currentItem} (${currentIdx} / ${totalCount})</code>`
}

const items = [
   ['wheelMesh', 'model/wheel.bin'],
   ['monitorMesh', 'model/monitor.bin'],
   ['monitorIntake', 'model/monitor-intake.bin'],

   ['chestBoxMesh', 'model/chest-box.bin'],
   ['chestPlateMesh', 'model/chest-plate.bin'],
   ['powerMesh', 'model/power.bin'],
   ['powerPinMesh', 'model/power-pin.bin'],

   ['abdomenMesh', 'model/abdomen.bin'],
   ['waistMesh', 'model/waist.bin'],

   ['shoulderConnectorMesh', 'model/shoulder-connector.bin'],
   ['shoulderPlateMesh', 'model/shoulder-plate.bin'],
   ['bigArmMesh', 'model/big-arm.bin'],
   ['bigArmCoverMesh', 'model/big-arm-cover.bin'],
   ['bigArmConnectorMesh', 'model/big-arm-connector.bin'],
   ['smallArmMesh', 'model/small-arm.bin'],
   ['smallArmCoverMesh', 'model/small-arm-cover.bin'],
   ['wheelSmallMesh', 'model/wheel-small.bin'],
   ['clawMesh', 'model/claw.bin'],
   ['clawCoverMesh', 'model/claw-cover.bin'],

   ['colorTimerMesh', 'model/ber.bin']
]

const fetchBinary = async url => {
   const response = await fetch(url)

   const arrayBuffer = await response.arrayBuffer()
   const floatArray = new Float32Array(arrayBuffer)
   return Array.from(floatArray)
}

export const loadModelAsync = async () => {
   const ret = {}
   for (const itemIdx in items) {
      const [name, path] = items[itemIdx]
      updateLoadIndicator(path, itemIdx, items.length)
      ret[name] = await fetchBinary(/* @vite-ignore */ path)
   }

   $('load-indicator').innerHTML = '<code>加载完成，玩的愉快！</code>'
   setTimeout(() => {
      $('load-indicator').style.display = 'none'
   }, 1000)
   return ret
}
