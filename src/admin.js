const YAML = require('yaml');
const fs = require('fs')

function makeConfig(env) {
  // config
  const baseConfig = {
    locale: 'fr',
    media_folder: 'api/medias/',
    public_folder: 'medias/',
  }

  const backend = require('./env/' + env)
  const postTypes = require('./postTypes')

  // write yaml
  const config = Object.assign(baseConfig, backend, postTypes)
  const output = YAML.stringify(config)
  fs.writeFileSync("./admin/config.yml", output);
}

module.exports = {
  makeConfig
};