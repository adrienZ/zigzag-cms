const { boolean, layout, object, string, text, markdown, _slugName } = require('../mixins')

module.exports = {
  ..._slugName('Projects'),
  folder: "/api/projects/",
  create: true,
  slug: "{{slug}}",
  format: 'json',
  fields: [
    layout('projects'),
    boolean('Published'),
    string('Title'),
    {
      ..._slugName('Cover'),
      widget: "file",
      required: false,
      allow_multiple: false,
    },
    {
      ..._slugName('Thumbnail'),
      widget: "image",
      required: false,
      allow_multiple: false,
    },
    markdown('Body'),
    object('Meta', [
      string('Role'),
      string('Url'),
      string('Time period'),
      text('Summary'),
      {
        ..._slugName('Team'),
        widget: 'list',
        allow_add: true,
        collapsed: true,
        fields: [
          {
            ..._slugName('Collaborator'),
            widget: "relation",
            collection: "collaborators",
            searchFields: ["name"],
            multiple: false,
            valueField: "name",
            displayFields: ["name"],
            required: true,
          },
          string('Role'),
        ]
      }
    ])
  ]
}