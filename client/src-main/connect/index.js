const backgroundSsb = require('./backgroundSsb')
const path = require('path')
const ssbKeys = require('ssb-keys')
const env = require('../env')
const observeFeed = require('./observeFeed')
const publishWall = require('./publishWall')

module.exports = () =>
  new Promise((resolve, reject) => {
    const cb = function(err, sbot, _, child) {
      if (err) return reject(err)

      console.log('WE ARE connected as', sbot.id)

      const feed$ = observeFeed(sbot)

      resolve({
        feed$,
        publishWall: publishWall(sbot),
        child,
      })
    }

    if (env === 'production') {
      backgroundSsb(cb)
    } else {
      console.log('Setting up local SSB key for debugging')

      backgroundSsb(
        {
          keys: ssbKeys.loadOrCreateSync(path.join(__dirname, '../../tmp/app-private.key')),
        },
        cb
      )
    }
  })
