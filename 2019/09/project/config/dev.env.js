'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPORT: "'http://127.0.0.1'",
  URL: '"http://localhost:8080/#/login"'
})
