import { ipcRenderer } from 'electron'

const publishTombstone = tombstone => {
  console.log('publishing', tombstone)
  ipcRenderer.send('tombstone', tombstone)
}

export default state => {
  if (state.gameOver) {
    return {
      fn: publishTombstone,
      args: [state.playerPosition],
    }
  }
}
