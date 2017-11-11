const path = require('path')
const { app, BrowserWindow } = require('electron')
const url = require('url')
const connect = require('./connect')
const env = require('./env')

const appPath =
  env === 'production'
    ? `file://${path.resolve(__dirname, '../dist/app.asar')}/index.html`
    : url.format({
        pathname: 'localhost:3000/index.html',
        protocol: 'http:',
        slashes: true,
      })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, fullscreen: env === 'production' })

  // and load the index.html of the app.
  win.loadURL(appPath)

  // Open the DevTools.
  if (env === 'development') {
    win.webContents.openDevTools()
  }

  connect().then(client => {
    client.feed$.subscribe({
      next: content => {
        console.log('content', content)
        win.webContents.send('wall', content)
      },
      error: error => {
        console.log('error', error)
      },
      complete: () => console.log('done'),
    })
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
