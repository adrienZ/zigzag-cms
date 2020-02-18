const env = process.env.NODE_ENV || 'local'
const isHTTP = process.env.USE_SERVER === 'true'
const { startServer } = require('./src/server')
const { makeConfig } = require('./src/admin')

makeConfig(env)

if (isHTTP) {
  const express = require('express')
  const staticMiddleware = express.static('./admin/')
  startServer(staticMiddleware)
}