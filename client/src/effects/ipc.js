import { ipcRenderer } from 'electron'
import { path } from 'ramda'
import { addTombstone, commitModification, addScore } from '../store'

const getPosition = path(['value', 'content', 'position'])
const getScore = path(['value', 'content', 'score'])
const getPlayerId = path(['value', 'author'])

export default ({ dispatch }) => {
  ipcRenderer.on('wall', (event, message) => dispatch(commitModification(getPosition(message))))
  ipcRenderer.on('tombstone', (event, message) => dispatch(addTombstone(getPosition(message))))
  ipcRenderer.on('score', (event, message) =>
    dispatch(addScore({ playerId: getPlayerId(message), score: getScore(message) }))
  )
  ipcRenderer.send('app-ready')
}
