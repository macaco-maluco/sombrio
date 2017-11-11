import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { range } from 'ramda'

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  viewport: {
    x: 0,
    y: 0,
  },
  objects: [
    // this is a line
    { type: 'wall', x: 1, y: 1 },
    { type: 'wall', x: 1, y: 2 },
    { type: 'wall', x: 1, y: 3 },
    { type: 'wall', x: 1, y: 4 },
    { type: 'wall', x: 1, y: 5 },
    { type: 'wall', x: 1, y: 6 },

    // this is a square
    { type: 'wall', x: 5, y: 1 },
    { type: 'wall', x: 5, y: 2 },
    { type: 'wall', x: 5, y: 3 },
    { type: 'wall', x: 6, y: 1 },
    { type: 'wall', x: 6, y: 2 },
    { type: 'wall', x: 6, y: 3 },
    { type: 'wall', x: 7, y: 1 },
    { type: 'wall', x: 7, y: 2 },
    { type: 'wall', x: 7, y: 3 },
  ],
}

const createGrid = (width, height) => range(height).map(line => range(width))

const grid2d = state =>
  state.objects.reduce((grid, object) => (grid[object.x][object.y] = object), createGrid(20, 20))

const objectsInPixes = state =>
  state.objects.map(object => ({ x: object.x * 60, y: object.y * 60 }))

render(
  <App
    width={initialState.width}
    height={initialState.height}
    objects={objectsInPixes(initialState)}
  />,
  document.getElementById('root')
)
