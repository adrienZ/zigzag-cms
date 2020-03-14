const { _slugName, string } = require('../mixins')
const { layout } = require('../mixins')

module.exports = {
  ..._slugName('collaborators'),
  folder: "/api/collaborators",
  create: true,
  format: 'json',
  slug: "{{slug}}",
  editor: {
    preview: false,
  },
  fields: [
    layout('collaborators'),
    string('Name'),
    string('website', {
      required: false
    }),
  ]
}