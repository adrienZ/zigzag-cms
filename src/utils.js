const path = require('path');
const fs = require('fs');
const { parseMdFile } = require('../functions')

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


const listEntityItems = (allFiles, url) => {
  const posts = allFiles
    .filter(item => item.includes(url) && !item.endsWith('/'))
    // return .md as url, else return filename
    .map(item => path.basename(item))
    .map(item => getMdAsJson('./api/' + url + '/' + item))
  return posts
}


const getMdAsJson = filepath => {
  const fileContent = fs.readFileSync(filepath, 'utf8')
  const slug = path.parse(filepath).name
  return parseMdFile(fileContent, slug)
}

module.exports = {
  sendFile,
  getMdAsJson,
  listEntityItems,
};