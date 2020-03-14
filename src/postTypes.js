const articles = require('./postTypes/type_articles')
const projects = require('./postTypes/type_projects')
const tags = require('./postTypes/type_tags')
const options = require('./postTypes/type_options')
const collaborators = require('./postTypes/type_collaborators')

module.exports = {
  collections: [
    articles,
    projects,
    tags,
    options,
    collaborators,
  ]
};