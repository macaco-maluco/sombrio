const ssbClient = require('ssb-client')
const observeFeed = require('./observeFeed')

ssbClient(function(err, sbot) {
  if (err) throw err
  console.log('connected as', sbot.id)

  const feed$ = observeFeed(sbot)

  feed$.subscribe({
    next: content => {
      console.log('content', content)
    },
    error: error => {
      console.log('error', error)
    },
    complete: () => console.log('done'),
  })
})
