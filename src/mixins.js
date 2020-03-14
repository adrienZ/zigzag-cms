const slugify = require('slugify')

const _withOptions = (obj = {}, options = {}) => Object.assign({}, obj, options)
const _slugName = (name = '') => ({
  label: name,
  name: slugify(name, {
    lower: true
  }),
})


const boolean = name => {
  return {
    ..._slugName(name),
    widget: "boolean",
    default: false,
    required: false,
  }
}

const layout = slug => {
  return {
    label: "Layout",
    name: "layout",
    widget: "hidden",
    default: slug
  }
}

const object = (name, fields) => {
  return {
    ..._slugName(name),
    widget: "object",
    fields: fields,
  }
}


const string = (name, options = {}) => {
  return _withOptions({
    ..._slugName(name),
    widget: "string",
  }, options)
}

const text = (name, options = {}) => {
  return _withOptions({
    ..._slugName(name),
    widget: "text",
  }, options)
}


const markdown = (name, options = {}) => {
  return _withOptions({
    ..._slugName(name),
    widget: "string",
  }, options)
}
module.exports = {
  boolean,
  layout,
  object,
  string,
  text,
  markdown,

  // utils
  _withOptions,
  _slugName,
};