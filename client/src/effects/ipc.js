import { ipcRenderer } from 'electron'
import { path } from 'ramda'
import { addTombstone, commitModification } from '../store'

const getPosition = path(['value', 'content', 'position'])

export default ({ dispatch }) => {
  ipcRenderer.on('wall', (event, message) => dispatch(commitModification(getPosition(message))))
  ipcRenderer.on('tombstone', (event, message) => dispatch(addTombstone(getPosition(message))))
  ipcRenderer.send('app-ready')
}
