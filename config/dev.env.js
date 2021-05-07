'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_API_KEY: '"23dee979c9c244890617f219710d9b7b"'
})
