process.on('uncaughtException', error => {
  console.error(error)
})

const ssbKeys = require('ssb-keys')
const path = require('path')
const electron = require('electron')
const createConfig = require('ssb-config/inject')

electron.ipcRenderer.on('ssb-server-start', event => {
  console.log('STARTING SBOT')

  const config = createConfig()
  config.keys = ssbKeys.loadOrCreateSync(path.join(config.path, 'secret'))
  config.manifestFile = path.join(config.path, 'manifest.json')

  var createSbot = require('scuttlebot')
    .use(require('scuttlebot/plugins/gossip'))
    .use(require('scuttlebot/plugins/invite'))
    .use(require('scuttlebot/plugins/local'))
    .use(require('scuttlebot/plugins/logging'))
    .use(require('scuttlebot/plugins/master'))
    .use(require('scuttlebot/plugins/replicate'))
    .use(require('ssb-about'))
    .use(require('ssb-backlinks'))
    .use(require('ssb-blobs'))
    .use(require('ssb-friends'))
    .use(require('ssb-links'))
    .use(require('ssb-private'))
    .use(require('ssb-query'))
    .use(require('ssb-ws'))

  const server = createSbot(config)

  electron.ipcRenderer.send('ssb-server-started', {
    manifest: server.getManifest(),
    address: server.getAddress(),
  })
})

electron.ipcRenderer.send('ssb-server-ready')
