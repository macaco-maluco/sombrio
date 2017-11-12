process.on('uncaughtException', error => {
  console.error(error)
})

const electron = require('electron')

electron.ipcRenderer.on('ssb-server-config', (event, config) => {
  console.log('STARTING SBOT')

  var createSbot = require('scuttlebot')
    .use(require('scuttlebot/plugins/master'))
    .use(require('scuttlebot/plugins/gossip'))
    .use(require('scuttlebot/plugins/replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-blobs'))
    .use(require('scuttlebot/plugins/invite'))
    .use(require('scuttlebot/plugins/local'))
    .use(require('scuttlebot/plugins/logging'))
    .use(require('ssb-private'))
    .use(require('ssb-links'))
    .use(require('ssb-query'))
    .use(require('ssb-ws'))

  const server = createSbot(config)

  electron.ipcRenderer.send('ssb-server-started', {
    manifest: server.getManifest(),
    address: server.getAddress(),
  })
})

electron.ipcRenderer.send('ssb-server-ready')
