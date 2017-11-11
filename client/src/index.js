import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { initialState, objectsInPixes } from './store'

render(
  <App
    width={initialState.width}
    height={initialState.height}
    objects={objectsInPixes(initialState)}
  />,
  document.getElementById('root')
)
