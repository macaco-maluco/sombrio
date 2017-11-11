import { ipcRenderer } from 'electron'
import { getFirstStagedModification } from '../store'

const publishWall = wall => {
  console.log('publishing', wall)
  ipcRenderer.send('wall', wall.position)
}

export default state => {
  const stagedModification = getFirstStagedModification(state)

  if (stagedModification)
    return {
      fn: publishWall,
      args: [stagedModification],
    }
}
