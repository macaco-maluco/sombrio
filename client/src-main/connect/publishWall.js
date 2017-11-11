module.exports = sbot => position =>
  new Promise((resolve, reject) => {
    sbot.publish(
      {
        type: 'macaco_maluco-sombrio-wall',
        position: position,
        channel: 'sombrio_shared_world',
      },
      error => {
        if (error) return reject(error)
        resolve()
      }
    )
  })
