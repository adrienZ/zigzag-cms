// dependecies
const YAML = require('yaml');
const fs = require('fs')
const express = require('express');
const ip = require('ip');
const serverless = require('serverless-http');

// env
const isProd = process.env.NODE_ENV === 'prod'

// config
const baseConfig = {
  locale: 'fr',
  media_folder: "/api/medias/",
  public_folder: "/api/medias/",
  show_preview_links: true
}
const backend = require(isProd ? './prod' : './dev')
const postTypes = require('./postTypes')

// write yaml
const config = Object.assign(baseConfig, backend, postTypes)
const output = YAML.stringify(config)
fs.writeFileSync("./admin/config.yml", output);

// server
const host = 'localhost' || ip.address()
const port = 3000
const app = express();
// routing
app.use('/', express.static('./admin/'));
app.use('/api', express.static('./api/'));
// run server
app.listen(port, host, () => console.log('app listening on http://' + host + ':' + port))

// on close
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C), killing servers");
  // some other closing procedures go here
  process.exit(1);
});

module.exports.handler = serverless(app);