const glob = require('glob');
const path = require('path');

const { getMdAsJson, sendFile, listEntityItems } = require('./src/utils')
const { startServer } = require('./src/server')


const apiMiddleware = (req, res) => {

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
      const post = getMdAsJson('./api/' + url + '.md')
      res.json({ ...post })
    }
    // serve files
    else if (files.includes(url)) {
      sendFile(url, res)
    }
    // 404
    else {
      res.status(404).send('404 Not found');
    }

    res.end()
  })
}

startServer(apiMiddleware)
// on close
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C), killing servers");
  // some other closing procedures go here
  process.exit(1);
});