
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-digital-timer.cjs.production.min.js')
} else {
  module.exports = require('./react-digital-timer.cjs.development.js')
}
