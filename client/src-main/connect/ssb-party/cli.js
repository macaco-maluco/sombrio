#!/usr/bin/env node

if (process.argv.length < 3) {
  console.error('usage: ssb-party <module> [<args>]')
  process.exit(1)
}

var createSsbParty = require('.')
var path = require('path')

var plugin = require(path.resolve(process.argv[2]))

createSsbParty(function(err, sbot, config) {
  if (err) throw err
  plugin.init(sbot, config)
})
