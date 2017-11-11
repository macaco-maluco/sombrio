import { ipcRenderer } from 'electron'
import { path } from 'ramda'
import { modify } from '../store'

const getPosition = path(['value', 'content', 'position'])

export default ({ dispatch }) => {
  ipcRenderer.on('wall', (event, message) => dispatch(modify(getPosition(message))))
}
