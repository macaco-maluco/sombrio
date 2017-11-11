const observeFeed = require('./observeFeed')
const publishWall = require('./publishWall')
const party = require('ssb-party')

module.exports = () =>
  new Promise((resolve, reject) => {
    party(function(err, sbot) {
      if (err) return reject(err)

      console.log('connected as', sbot.id)

      const feed$ = observeFeed(sbot)

      resolve({
        feed$,
        publishWall: publishWall(sbot),
      })
    })
  })
