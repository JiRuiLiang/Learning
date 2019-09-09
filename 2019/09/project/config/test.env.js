'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  APIPORT: "'http://127.0.0.1'",
  URL: '"http://127.0.0.1/#/login"'
})
