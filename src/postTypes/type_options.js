module.exports = {
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
              default: false,
              required: false,
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
}