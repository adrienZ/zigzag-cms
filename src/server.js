const express = require('express')

// server
const host = 'localhost' || ip.address()
const port = process.env.PORT || 8080;
const app = express();

function startServer(middleware) {
  app.use('/', middleware)
  app.listen(port, () => console.log('app listening on http://' + host + ':' + port))

}


module.exports = {
  startServer
};