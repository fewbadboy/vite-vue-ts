import express from 'express'
import chokidar from 'chokidar'
import pc from "picocolors"
import { fileURLToPath } from 'url'
import path from 'node:path'

import userHandle from './handlers/userHandler.mjs'
import productHandler from './handlers/productHandler.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 8000
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(userHandle)
server.use('/product', productHandler)

server.listen(PORT, () => {
  console.log(
    pc.green(`[Mock Server]:`),
    pc.blue(`server start at port: ${PORT}`)
  )
})

const watchFile = path.join(__dirname, 'index.mjs')
console.log(
    pc.yellow(`[Mock Server Watching]: ${watchFile}`),
  )
const watch = chokidar.watch(watchFile, {
  persistent: true,
  ignoreInitial: true,
  ignored: [
    '**/hiberfil.sys',
    '**/pagefile.sys',
    '**/System Volume Information/**',
    '**/.git/**',
    '**/node_modules/**'
  ]
})

watch.on('change', () => {
  process.exit(0);
})

watch.on('error', (err) => {
  console.log(
    pc.red(`[Mock Server Error]: ${err.message}`),
  )
});