#!/usr/bin/env node

const fs = require('fs')

const file = process.argv[2]

const fileContent = fs.readFileSync(file)
   .toString('utf-8')
   .split('\n')
   .map(line => line.trim())
   .filter(line => line !== '' && !line.startsWith('//'))
   .join('')

fs.writeFileSync(file, fileContent)