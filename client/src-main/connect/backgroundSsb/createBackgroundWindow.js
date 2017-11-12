const { BrowserWindow } = require('electron')
const path = require('path')
const env = require('../../env')

module.exports = function(modulePath) {
  const opts = {
    connect: false,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 768,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
    title: 'ssb-server',
    useContentSize: true,
    width: 1024,
  }

  var window = new BrowserWindow(opts)
  window.webContents.on('dom-ready', function() {
    window.webContents.executeJavaScript(`
      require(${JSON.stringify(modulePath)})
    `)
  })

  if (env === 'development') {
    window.webContents.openDevTools()
  }

  window.loadURL('file://' + path.join(__dirname, 'base.html'))
  return window
}
