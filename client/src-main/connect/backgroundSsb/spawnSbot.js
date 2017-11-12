const path = require('path')
const { ipcMain } = require('electron')
const createBackgroundWindow = require('./createBackgroundWindow')

module.exports = () =>
  new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, './backgroundProcess.js')

    ipcMain.on('ssb-server-started', (event, msg) => {
      resolve(msg.address)
    })

    ipcMain.on('ssb-server-ready', event => {
      event.sender.send('ssb-server-start')
    })

    createBackgroundWindow(scriptPath)
  })
