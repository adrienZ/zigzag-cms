export const parseMdFile = fileContent => {
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

  // const slug = path.parse(filepath).name
  let slug = 'slug'

  return { slug, body, ...metaData }
}