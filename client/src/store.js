import { range } from 'ramda'
import PF from 'pathfinding'

export const initialState = {
  window: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  gridSize: 60,
  width: 11,
  height: 11,
  playerPosition: {
    x: 3,
    y: 6,
  },
  monsterPosition: {
    x: 8,
    y: 6,
  },
  objects: [
    // this is a line
    { type: 'wall', x: 8, y: 1 },
    { type: 'wall', x: 9, y: 1 },
    { type: 'wall', x: 10, y: 1 },

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

    // this is a line
    { type: 'wall', x: 7, y: 4 },
    { type: 'wall', x: 7, y: 5 },
    { type: 'wall', x: 7, y: 6 },
    { type: 'wall', x: 7, y: 7 },
    { type: 'wall', x: 7, y: 8 },
    { type: 'wall', x: 7, y: 9 },
  ],
}

const createGrid = (width, height) => range(0, height).map(line => range(0, width).map(() => 0))

export const grid2d = state => {
  const emptyGrid = createGrid(state.width, state.height)

  return state.objects.reduce((grid, object) => {
    grid[object.y][object.x] = 1
    return grid
  }, emptyGrid)
}

export const objectsInPixes = state =>
  state.objects.map(object => ({ x: object.x * 60, y: object.y * 60 }))

export const findPath = state => {
  const grid = new PF.Grid(grid2d(state))
  const finder = new PF.AStarFinder()

  return finder.findPath(
    state.monsterPosition.x,
    state.monsterPosition.y,
    state.playerPosition.x,
    state.playerPosition.y,
    grid
  )
}
