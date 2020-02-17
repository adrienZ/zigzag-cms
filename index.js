// dependecies
const express = require('express')

// env
const isProd = process.env.NODE_ENV === 'prod'
const { startServer } = require('./src/server')
const { getMdAsJson } = require('./src/utils')
const { makeConfig } = require('./src/admin')

makeConfig(isProd)

const staticMiddleware = express.static('./admin/')
startServer(staticMiddleware)

module.exports = {
  getMdAsJson
};

