const ssbClient = require('ssb-client')
const observeFeed = require('./observeFeed')
const publishWall = require('./publishWall')

module.exports = () =>
  new Promise((resolve, reject) => {
    ssbClient(function(err, sbot) {
      if (err) return reject(err)

      console.log('connected as', sbot.id)

      const feed$ = observeFeed(sbot)

      resolve({
        feed$,
        publishWall: publishWall(sbot),
      })
    })
  })
