import { ipcRenderer } from 'electron'
import { path } from 'ramda'
import { commitModification } from '../store'

const getPosition = path(['value', 'content', 'position'])

export default ({ dispatch }) => {
  ipcRenderer.on('wall', (event, message) => dispatch(commitModification(getPosition(message))))
}
