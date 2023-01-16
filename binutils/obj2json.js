#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs')

const fileName = process.argv[2]
const outputFileName = process.argv[3]

const objContent = readFileSync(fileName).toString('utf-8')
const objLines = objContent.split('\n')

const vertexPool = []
const output = []

for (const line of objLines) {
   const [type, ...rest] = line.split(' ')
   switch (type) {
      case 'v': {
         vertexPool.push(rest.map(parseFloat))
         break
      }
      case 'f': {
         const v0 = vertexPool[rest[0] - 1]
         const v1 = vertexPool[rest[1] - 1]
         const v2 = vertexPool[rest[2] - 1]

         const v0v1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]]
         const v1v2 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]]

         const vn = [
            v0v1[1] * v1v2[2] - v0v1[2] * v1v2[1],
            v0v1[2] * v1v2[0] - v0v1[0] * v1v2[2],
            v0v1[0] * v1v2[1] - v0v1[1] * v1v2[0]
         ]

         output.push(
            ...v0, ...vn,
            ...v1, ...vn,
            ...v2, ...vn
         )
      }
   }
}

if (outputFileName.endsWith('.js') || outputFileName.endsWith('.mjs')) {
   writeFileSync(outputFileName, `export default ${JSON.stringify(output)}`)
} else if (outputFileName.endsWith('.cjs')) {
   writeFileSync(outputFileName, `module.exports = ${JSON.stringify(output)}`)
} else {
   writeFileSync(outputFileName, JSON.stringify(output))
}
