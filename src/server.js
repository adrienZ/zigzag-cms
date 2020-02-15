// dependecies
const YAML = require('yaml');
const fs = require('fs')
const express = require('express');
const ip = require('ip');
const glob = require('glob');
const path = require('path');
// env
const isProd = process.env.NODE_ENV === 'prod'

// config
const baseConfig = {
  locale: 'fr',
  media_folder: "./api/medias/",
  public_folder: "./api/medias/",
}
const backend = require(isProd ? './prod' : './dev')
const postTypes = require('./postTypes')

// write yaml
const config = Object.assign(baseConfig, backend, postTypes)
const output = YAML.stringify(config)
fs.writeFileSync("./admin/config.yml", output);

// server
const host = 'localhost' || ip.address()
const port = process.env.PORT || 8080;
const app = express();


const sendFile = (url, res) => {
  const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
  };
  const type = mime[path.extname(url).slice(1)] || 'text/plain';
  const file = fs.readFileSync('./api/' + url);
  res.writeHead(200, { 'Content-Type': type });
  res.end(file, 'binary')

  return file
}


const getFileAsPost = filepath => {
  const fileContent = fs.readFileSync(filepath, 'utf8')

  // detect metadata from source .md
  const pattern = /^(---)((.|\n)*?)(---\n)/gim
  const matches = fileContent.match(pattern)

  // extract metadata from markdown
  const body = fileContent.replace(matches[0], '')

  // parse metadata from str to array
  const infos =
    matches[0]
      .replace('\n---', '')
      .replace('---\n', '')
      .split('\n')
  infos.pop()

  // format metadata as object
  const metaData = infos.reduce((acc, str) => {
    const line = str.split(':')
    const key = line[0]
    const value = str.replace(key + ':', '')
    acc[key] = value
    return acc
  }, {})


  return { body, ...metaData }
}


const listEntityItems = (allFiles, url) => {
  const posts = allFiles
    .filter(item => item.includes(url) && !item.endsWith('/'))
    // return .md as url, else return filename
    .map(item => path.basename(item))
    .map(item => getFileAsPost('./api/' + url + '/' + item))

  return posts
}





// routing
app.use('/', express.static('./admin/'));
app.use('/api', (req, res) => {

  glob('**/*', {
    cwd: './api/',
    mark: true,
  }, (err, files) => {
    const url = req.url.substring(1)

    const entities = files
      .filter(url => url.split('/').length === 2 && url.endsWith('/'))


    // list items of entity
    for (let entityName of entities) {
      if (url === entityName + 'list') {
        const posts = listEntityItems(files, url.replace('/list', ''))
        res.json({ items: posts })
        return res.end()
      }
    }


    // list entites if root
    if (url === '') {
      res.json({ entities })
    }
    // list items if entitiy
    else if (entities.includes(url)) {
      const items = files
        .filter(item => item.includes(url) && !item.endsWith('/'))
        // return .md as url, else return filename
        .map(item => path.parse(item).ext === '.md' ? path.parse(item).name : path.basename(item))

      res.json({ items })
    }
    // if post
    else if (files.includes(url + '.md')) {
      const post = getFileAsPost('./api/' + url + '.md')
      res.json({ ...post })
    }
    // serve files
    else if (files.includes(url)) {
      sendFile(url)
    }
    // 404
    else {
      res.status(404).send('404 Not found');
    }

    res.end()
  })
});
// run server
app.listen(port, () => console.log('app listening on http://' + host + ':' + port))

// on close
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C), killing servers");
  // some other closing procedures go here
  process.exit(1);
});