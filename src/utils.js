const path = require('path');
const fs = require('fs');


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
    const key = line[0].trim()
    const value = str.replace(key + ':', '').trim()
    acc[key] = value
    return acc
  }, {})

  const slug = path.parse(filepath).name


  return { slug, body, ...metaData }
}

module.exports = {
  sendFile,
  getMdAsJson,
  listEntityItems,
};