// dependecies
const YAML = require('yaml');
const fs = require('fs')
const express = require('express');

// env
const isProd = process.env.NODE_ENV === 'prod'

// config
const baseConfig = {
  locale: 'fr',
  media_folder: "/static/uploads/",
  public_folder: "/static/uploads/",
  show_preview_links: true
}
const backend = require(isProd ? './prod' : './dev')
const postTypes = require('./postTypes')

// write yaml
const config = Object.assign(baseConfig, backend, postTypes)
const output = YAML.stringify(config)
fs.writeFileSync("./admin/config.yml", output);

// lanch server
if (isProd) {
  const app = express();
  app.use(express.static('.')); //use static files in ROOT/public folder
  app.listen(3000, function () {
    console.log('app listening on port 3000!')
  })
}