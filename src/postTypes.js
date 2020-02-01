module.exports = {
  "collections": [
    {
      "name": "projects",
      "label": "Projects",
      "folder": "/api/projects/",
      "create": true,
      "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
      "preview_path": "blog/{{year}}/{{month}}/{{filename}}.{{extension}}",
      preview_path_date_field: "updated_on",
      "fields": [
        {
          "label": "Layout",
          "name": "layout",
          "widget": "hidden",
          "default": "projects"
        },
        {
          "label": "Title",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Publish Date",
          "name": "date",
          "widget": "datetime"
        },
        {
          "label": "Featured Image",
          "name": "thumbnail",
          "widget": "image",
          "required": false
        },
        {
          "label": "Body",
          "name": "body",
          "widget": "markdown"
        }
      ]
    },
    {
      "name": "articles",
      "label": "Articles",
      "folder": "/api/articles",
      "create": true,
      "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
      preview: false,
      summary: "Version: {{version}} - {{title}}",
      "fields": [
        {
          "label": "Layout",
          "name": "layout",
          "widget": "hidden",
          "default": "projects"
        },
        {
          "label": "Title",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Publish Date",
          "name": "date",
          "widget": "datetime"
        },
        {
          "label": "Featured Image",
          "name": "thumbnail",
          "widget": "image",
          "required": false
        },
        {
          "label": "Body",
          "name": "body",
          "widget": "markdown"
        }
      ]
    }
  ]
};