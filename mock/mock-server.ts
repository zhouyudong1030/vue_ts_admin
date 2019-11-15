import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import yaml from 'yamljs'

const app = express()
const port = 9528


// // 压缩请求
app.use(compression)

// // logger
app.use(morgan('dev'))

// // 允许跨域
app.use(cors())

// bodyParser
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false
}))

// no cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Progma', 'no-cahce')
  res.header('Expires', '-1')
  next()
})

// Catch 404 error
app.use((req, res, next) => {
  const error = new Error('not Found')
  res.status(404).json({
    message: error.message,
    error
  })
})

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
console.log(`Mocker server started on port ${port}!`);

function onError(error: any) {
  if (error.syscall !== 'listen') { // syscall: 系统调用
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR(app) : %s requires elevated pricileges', bind)
      process.exit(1)
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind)
      process.exit(1)
    default:
      throw error
  }
}