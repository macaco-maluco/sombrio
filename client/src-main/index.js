const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const connect = require('./connect')
const env = require('./env')
const R = require('ramda')

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
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    fullscreen: env === 'production',
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
  })

  // and load the index.html of the app.
  win.loadURL(appPath)

  // Open the DevTools.
  if (env === 'development') {
    win.webContents.openDevTools()
  }

  connect().then(client => {
    const buffer = []

    client.feed$.subscribe({
      next: content => {
        const type = R.path(['value', 'content', 'type'], content)
        if (!type.match(/macaco_maluco-sombrio/)) return

        buffer.push(content)

        switch (type) {
          case 'macaco_maluco-sombrio-tombstone':
            win.webContents.send('tombstone', content)
            break
          case 'macaco_maluco-sombrio-wall':
            win.webContents.send('wall', content)
            break
          case 'macaco_maluco-sombrio-score':
            win.webContents.send('score', content)
            break
        }
      },
      error: error => {
        console.log('error', error)
      },
      complete: () => console.log('done'),
    })

    ipcMain.on('app-ready', () => {
      win.webContents.send('playerId', client.myId)

      buffer.forEach(content => {
        const type = R.path(['value', 'content', 'type'], content)

        switch (type) {
          case 'macaco_maluco-sombrio-tombstone':
            win.webContents.send('tombstone', content)
            break
          case 'macaco_maluco-sombrio-wall':
            win.webContents.send('wall', content)
            break
          case 'macaco_maluco-sombrio-score':
            win.webContents.send('score', content)
            break
        }
      })
    })

    ipcMain.on('wall', (event, position) => {
      client.publishWall(position)
    })

    ipcMain.on('score', (event, score) => {
      client.publishScore(score)
    })

    ipcMain.on('tombstone', (event, position) => {
      client.publishTombstone(position)
    })
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
    process.exit(0)
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
