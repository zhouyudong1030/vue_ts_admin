import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import path from 'path'
import yaml from 'yamljs'

const app = express()
const port = 9528


// 压缩请求
app.use(compression)

// logger
app.use(morgan('dev'))

// 允许跨域
app.use(cors())

// bodyParser
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false
}))

// no cache
// app.use()