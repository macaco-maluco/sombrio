import { ipcRenderer } from 'electron'
import { calculateScore } from '../store'

const publishScore = tombstone => {
  console.log('publishing', tombstone)
  ipcRenderer.send('score', tombstone)
}

export default state => {
  if (state.gameOver) {
    return {
      fn: publishScore,
      args: [calculateScore(state), state.gameOverTimestamp],
    }
  }
}
