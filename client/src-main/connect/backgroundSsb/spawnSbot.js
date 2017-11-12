const path = require('path')
const fs = require('fs')
const { ipcMain } = require('electron')
const createBackgroundWindow = require('./createBackgroundWindow')

module.exports = function(config, cb) {
  var scriptPath = path.join(__dirname, './backgroundProcess.js')

  ipcMain.on('ssb-server-started', (event, msg) => {
    const manifestJSON = JSON.stringify(msg.manifest, null, 2)
    console.log('Writing manifest to', config.manifestFile)
    fs.writeFile(config.manifestFile, manifestJSON, function(err) {
      if (err) console.error('warning: unable to write manifest: ' + err.stack)
      cb(null, msg.address)
    })
  })

  ipcMain.on('ssb-server-ready', event => {
    console.error('Starting scuttlebot...', config)
    event.sender.send('ssb-server-config', config)
  })

  createBackgroundWindow(scriptPath)
}
