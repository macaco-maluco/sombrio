module.exports = sbot => score =>
  new Promise((resolve, reject) => {
    sbot.publish(
      {
        type: 'macaco_maluco-sombrio-score',
        score: score,
        channel: 'sombrio_shared_world',
      },
      error => {
        if (error) return reject(error)
        resolve()
      }
    )
  })
