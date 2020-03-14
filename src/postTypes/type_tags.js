const { _slugName, string } = require('../mixins')
const { layout } = require('../mixins')
const regTypes = require('../types')

module.exports = {
  ..._slugName('Tags'),
  folder: "/api/tags",
  create: true,
  format: 'json',
  slug: "{{slug}}",
  editor: {
    preview: false,
  },
  fields: [
    layout('Tags'),
    string('Name', {
      pattern: regTypes.lowercase
    })
  ]
}