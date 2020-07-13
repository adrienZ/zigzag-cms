const { boolean, layout, object } = require('../mixins')

module.exports = {
  name: "articles",
  label: "Articles",
  folder: "/api/articles",
  create: true,
  format: 'json',
  slug: "{{slug}}",
  preview: false,
  fields: [
    layout('articles'),
    boolean('Published'),
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    object('Metadata', [
      {
        label: "Publish Date",
        name: "date",
        widget: "datetime"
      },
      {
        label: "Featured Image",
        name: "thumbnail",
        widget: "image",
        required: false,
        allow_multiple: false,
      },
    ]),
    object('SEO', [
      {
        label: "Tags",
        name: "tags",
        widget: "relation",
        collection: "tags",
        searchFields: ["name"],
        multiple: true,
        valueField: "name",
        displayFields: ["name"],
        required: false,
      },
      {
        label: "Canonical Url",
        name: "canonical_url",
        widget: "string",
        required: false,
      },
    ]),
    {
      label: "Body",
      name: "body",
      widget: "markdown"
    }
  ]
}