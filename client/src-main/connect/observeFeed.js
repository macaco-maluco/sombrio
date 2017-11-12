const pull = require('pull-stream')
const { path } = require('ramda')
const create = require('@most/create').create

module.exports = function feed(sbot) {
  return create(function(add, end, error) {
    pull(
      sbot.createLogStream({
        live: true,
        keys: true,
      }),
      pull.drain(add, end)
    )
  }).filter(message => {
    // console.log('.')
    return (path(['value', 'content', 'type'], message) || '').match(/macaco_maluco-sombrio/)
  })
}
