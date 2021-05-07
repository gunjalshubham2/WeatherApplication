'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  APP_API_KEY: '"23dee979c9c244890617f219710d9b7b"'
})
