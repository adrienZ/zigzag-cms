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
          label: "Published",
          name: "published",
          widget: "boolean",
          default: false,
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
          default: "articles"
        },
        {
          label: "Published",
          name: "published",
          widget: "boolean",
          default: false,
        },
        {
          label: "Title",
          name: "title",
          widget: "string"
        },
        {
          label: "Metadata",
          name: 'metadata',
          widget: "object",
          fields: [
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
          ]
        },
        {
          label: "SEO",
          name: 'seo',
          widget: "object",
          fields: [
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
          ]
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
          label: "Layout",
          name: "layout",
          widget: "hidden",
          default: "tags"
        },
        {
          label: "Name",
          name: "name",
          widget: "string",
          pattern: ["[a-z0-9]+", "Tag must be in lowercase"]
        },
      ]

    },
    {
      name: "options",
      label: "Options",
      preview: false,
      files: [
        {
          label: 'Réseaux Sociaux',
          name: 'networks',
          format: "json",
          slug: "{{slug}}",
          file: "api/options/networks.json",
          fields: [
            {
              label: "Items",
              name: "items",
              widget: "list",
              collapsed: false,
              allow_add: true,
              fields: [
                {
                  label: "Afficher",
                  name: "show",
                  widget: "boolean",
                  default: false
                },
                {
                  label: "Nom",
                  name: "name",
                  widget: "string",
                },
                {
                  label: "Icon",
                  hint: "inline svg",
                  name: "icon",
                  widget: "code",
                  output_code_only: true,
                },
                {
                  label: "Url",
                  name: "url",
                  widget: "string",
                },
              ]
            }
          ]
        }
      ]

    },
  ]
};