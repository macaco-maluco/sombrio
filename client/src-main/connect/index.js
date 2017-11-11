const party = require('ssb-party')
const path = require('path')
const ssbKeys = require('ssb-keys')
const env = require('../env')
const observeFeed = require('./observeFeed')
const publishWall = require('./publishWall')

module.exports = () =>
  new Promise((resolve, reject) => {
    const cb = function(err, sbot) {
      if (err) return reject(err)

      console.log('connected as', sbot.id)

      const feed$ = observeFeed(sbot)

      resolve({
        feed$,
        publishWall: publishWall(sbot),
      })
    }

    if (env === 'production') {
      party(cb)
    } else {
      console.log('Setting up local SSB key for debugging')

      party(
        {
          keys: ssbKeys.loadOrCreateSync(path.join(__dirname, '../../tmp/app-private.key')),
        },
        cb
      )
    }
  })
