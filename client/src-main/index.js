const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
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
let win, child

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1024, height: 768, fullscreen: env === 'production' })

  // and load the index.html of the app.
  win.loadURL(appPath)

  // Open the DevTools.
  if (env === 'development') {
    win.webContents.openDevTools()
  }

  connect().then(client => {
    const buffer = []
    child = client.child

    client.feed$.subscribe({
      next: content => {
        buffer.push(content)
        win.webContents.send('wall', content)
      },
      error: error => {
        console.log('error', error)
      },
      complete: () => console.log('done'),
    })

    ipcMain.on('app-ready', () => {
      buffer.forEach(content => win.webContents.send('wall', content))
    })

    ipcMain.on('wall', (event, position) => {
      client.publishWall(position)
    })
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
    if (child) {
      process.kill(-child.pid)
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (!win) {
    createWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})
