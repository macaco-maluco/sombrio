import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { initialState, objectsInPixes, playerInPixels, monsterInPixels } from './store'

render(
  <App
    width={initialState.window.width}
    height={initialState.window.height}
    objects={objectsInPixes(initialState)}
    playerPosition={playerInPixels(initialState)}
    monsterPosition={monsterInPixels(initialState)}
  />,
  document.getElementById('root')
)
