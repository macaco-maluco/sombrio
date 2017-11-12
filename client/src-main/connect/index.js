const path = require('path')
const ssbKeys = require('ssb-keys')
const env = require('../env')
const backgroundSsb = require('./backgroundSsb')
const observeFeed = require('./observeFeed')
const publishWall = require('./publishWall')
const joinEasySsbPub = require('./joinEasySsbPub')

module.exports = async () => {
  const sbot = await backgroundSsb(keys())
  console.log('WE ARE connected as', sbot.id)

  const feed$ = observeFeed(sbot)

  return {
    feed$,
    publishWall: publishWall(sbot),
    joinEasySsbPub: joinEasySsbPub(sbot),
  }
}

const keys = () => {
  // if (env === 'production') {
  return null
  // } else {
  //   console.log('DEBUG keys')
  //
  //   return ssbKeys.loadOrCreateSync(path.join(__dirname, '../../tmp/app-private.key'))
  // }
}
