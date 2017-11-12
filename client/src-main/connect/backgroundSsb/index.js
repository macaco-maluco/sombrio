const { promisify } = require('util')
const path = require('path')
const ssbKeys = require('ssb-keys')
const createConfig = require('ssb-config/inject')
const ssbClient = promisify(require('ssb-client'))
const spawnSbot = require('./spawnSbot')

const createClient = keys => {
  if (keys) {
    const config = createConfig()
    config.keys = keys || ssbKeys.loadOrCreateSync(path.join(config.path, 'secret'))
    config.manifestFile = path.join(config.path, 'manifest.json')
    config.key = keys.id

    console.log('CONFIGURACAO', config)

    return ssbClient(keys, config)
  } else {
    return ssbClient()
  }
}

module.exports = async keys => {
  console.log('COOOKIE', keys)

  try {
    await ssbClient()
    // return keys ? await ssbClient({ keys }) : await ssbClient({})
  } catch (e) {
    console.log('FAILED TO CONNECT')

    await spawnSbot()
    console.log('ABOUT to start again')

    return ssbClient()
    // return keys ? ssbClient({ keys }) : ssbClient({})
  }
}
