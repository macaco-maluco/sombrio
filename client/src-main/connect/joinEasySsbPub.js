const axios = require('axios')
const { promisify } = require('util')

module.exports = sbot => async baseUrl => {
  console.log('BATATAAAA')

  const response = await axios.get(`${baseUrl}/invited/json`)

  const invitation = response.data.invitation

  console.log('Accepting invite', invitation, sbot.accept)

  await promisify(sbot.accept)(invitation)
}
