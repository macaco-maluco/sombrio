const backgroundSsb = require('./backgroundSsb')
const path = require('path')
const ssbKeys = require('ssb-keys')
const env = require('../env')
const observeFeed = require('./observeFeed')
const publishTombstone = require('./publishTombstone')
const publishWall = require('./publishWall')
const publishScore = require('./publishScore')

module.exports = () =>
  new Promise((resolve, reject) => {
    const cb = function(err, sbot, _, child) {
      if (err) return reject(err)

      console.log('WE ARE connected as', sbot.id)

      const feed$ = observeFeed(sbot)

      resolve({
        feed$,
        publishTombstone: publishTombstone(sbot),
        publishWall: publishWall(sbot),
        publishScore: publishScore(sbot),
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
