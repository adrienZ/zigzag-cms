module.exports = {
  collections: [
    {
      name: "projects",
      label: "Projects",
      folder: "/api/projects/",
      create: true,
      format: "json",
      slug: "{{slug}}",
      // preview_path: "blog/{{year}}/{{month}}/{{filename}}.{{extension}}",
      // preview_path_date_field: "updated_on",
      format: 'json',
      fields: [
        {
          label: "Layout",
          name: "layout",
          widget: "hidden",
          default: "projects"
        },
        {
          label: "Title",
          name: "title",
          widget: "string"
        },
        {
          label: "Publish Date",
          name: "date",
          widget: "datetime"
        },
        {
          label: "Featured Image",
          name: "thumbnail",
          widget: "image",
          required: false
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown"
        }
      ]
    },
    {
      name: "articles",
      label: "Articles",
      folder: "/api/articles",
      create: true,
      format: 'json',
      slug: "{{slug}}",
      preview: false,
      fields: [
        {
          label: "Layout",
          name: "layout",
          widget: "hidden",
          default: "projects"
        },
        {
          label: "Title",
          name: "title",
          widget: "string"
        },
        {
          label: "Tags",
          name: "tags",
          widget: "relation",
          collection: "tags",
          searchFields: ["name"],
          multiple: true,
          valueField: "name",
          displayFields: "name",
          required: false,
        },
        {
          label: "Canonical Url",
          name: "canonical_url",
          widget: "string",
          required: false,
        },
        {
          label: "Publish Date",
          name: "date",
          widget: "datetime"
        },
        {
          label: "Featured Image",
          name: "thumbnail",
          widget: "image",
          required: false
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown"
        }
      ]
    },
    {
      name: "tags",
      label: "Tags",
      folder: "/api/tags",
      create: true,
      format: 'json',
      slug: "{{slug}}",
      editor: {
        preview: false,
      },
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
          pattern: ["[a-z0-9]+", "Tag must be in lowercase"]
        },
      ]

    }
  ]
};