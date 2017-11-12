/**
 * Code extracted from npm package `ssb-party` but adapted to start
 * a new process using an Electron BrowserWindow via the local `spawnSbot`
 */

/* eslint node/no-deprecated-api: off */

var createConfig = require('ssb-config/inject')
var ssbKeys = require('ssb-keys')
var path = require('path')
var fs = require('fs')
var MultiServer = require('multiserver')
var msShs = require('multiserver/plugins/shs')
var msNet = require('multiserver/plugins/net')
var muxrpc = require('muxrpc')
var pull = require('pull-stream')
var ssbHash = require('pull-hash/ext/ssb')
var multicb = require('multicb')
var spawnSbot = require('./spawnSbot')

function toSodiumKeys(keys) {
  if (!keys || !keys.public) return null
  return {
    publicKey: new Buffer(keys.public.replace('.ed25519', ''), 'base64'),
    secretKey: new Buffer(keys.private.replace('.ed25519', ''), 'base64'),
  }
}

function fixAddBlob(add) {
  return function(hash, cb) {
    if (typeof hash === 'function') {
      cb = hash
      hash = null
    }
    var done = multicb({ pluck: 1, spread: true })
    var sink = pull(ssbHash(done()), add(hash, done()))
    done(cb)
    return sink
  }
}

module.exports = function(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  opts = opts || {}
  var config = opts.ignoreConfigfile
    ? opts
    : createConfig(process.env.ssb_appname || opts.appName, opts)
  var appKey =
    config.appKey || (config.caps && config.caps.shs && new Buffer(config.caps.shs, 'base64'))
  if (!appKey) return cb(new Error('missing secret-handshake capability key'))
  var keys =
    config.keys || (config.keys = ssbKeys.loadOrCreateSync(path.join(config.path, 'secret')))
  config.manifestFile = path.join(config.path, 'manifest.json')

  var shs = msShs({
    keys: toSodiumKeys(keys),
    appKey: appKey,
    auth: function(cb) {
      cb(null, false)
    },
    timeout: (config.timers && config.timers.handshake) || 5e3,
  })

  var ms = MultiServer([[msNet({}), shs]])

  var keyPublic = keys.public.replace('.ed25519', '')
  var host = config.host || 'localhost'
  var remote = 'net:' + host + ':' + config.port + '~shs:' + keyPublic
  ;(function tryConnect(remote) {
    ms.client(remote, function(err, stream) {
      if (err && err.code === 'ECONNREFUSED') {
        return spawnSbot(config, function(err, remote) {
          if (err) return cb(new Error('unable to connect to or start sbot: ' + err.stack))

          console.log('TRY to connect', remote)

          tryConnect(remote)
        })
      }
      if (err) return cb(new Error('unable to connect to sbot: ' + err.stack))

      var manifest = config.manifest || JSON.parse(fs.readFileSync(config.manifestFile))
      var sbot = muxrpc(manifest, false)()
      sbot.id = '@' + stream.remote.toString('base64') + '.ed25519'
      if (sbot.blobs && sbot.blobs.add) sbot.blobs.add = fixAddBlob(sbot.blobs.add)
      pull(stream, sbot.createStream(), stream)
      delete config.keys
      cb(null, sbot, config)
    })
  })(remote)
}
