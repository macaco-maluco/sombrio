import { range } from 'ramda'
import PF from 'pathfinding'
import { createStore } from 'redux'
import tickEffect from './effects/tick'

export const initialState = {
  window: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  gridSize: 60,
  width: 30,
  height: 30,
  playerPosition: [3, 6],
  targetPosition: [0, 0],
  monsterPosition: [8, 6],
  objects: [
    // this is a line
    { type: 'wall', position: [8, 1] },
    { type: 'wall', position: [9, 1] },
    { type: 'wall', position: [10, 1] },

    // this is a line
    { type: 'wall', position: [1, 1] },
    { type: 'wall', position: [1, 2] },
    { type: 'wall', position: [1, 3] },
    { type: 'wall', position: [1, 4] },
    { type: 'wall', position: [1, 5] },
    { type: 'wall', position: [1, 6] },

    // this is a square
    { type: 'wall', position: [5, 1] },
    { type: 'wall', position: [5, 2] },
    { type: 'wall', position: [5, 3] },
    { type: 'wall', position: [6, 1] },
    { type: 'wall', position: [6, 2] },
    { type: 'wall', position: [6, 3] },
    { type: 'wall', position: [7, 1] },
    { type: 'wall', position: [7, 2] },
    { type: 'wall', position: [7, 3] },

    // this is a line
    { type: 'wall', position: [7, 4] },
    { type: 'wall', position: [7, 5] },
    { type: 'wall', position: [7, 6] },
    { type: 'wall', position: [7, 7] },
    { type: 'wall', position: [7, 8] },
    { type: 'wall', position: [7, 9] },
  ],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_TO_PIXELS':
      return {
        ...state,
        targetPosition: fromPixels(action.payload),
      }

    case 'MODIFY_IN_PIXELS':
      return {
        ...state,
        objects: [...state.objects, { type: 'wall', position: fromPixels(action.payload) }],
      }

    case 'TICK':
      return {
        ...state,
        monsterPosition: findMonsterPath(state)[1] || state.monsterPosition,
        playerPosition: findPlayerPath(state)[1] || state.playerPosition,
      }

    default:
      return state
  }
}

const createGrid = (width, height) => range(0, height).map(line => range(0, width).map(() => 0))

export const grid2d = state => {
  const emptyGrid = createGrid(state.width, state.height)

  return state.objects.reduce((grid, object) => {
    grid[object.position[1]][object.position[0]] = 1
    return grid
  }, emptyGrid)
}

export const toPixels = x => x.map(y => y * 60)
export const fromPixels = x => x.map(y => Math.floor(y / 60))

export const objectsInPixes = state =>
  state.objects.map(object => ({ ...object, position: toPixels(object.position) }))

export const playerInPixels = state => toPixels(state.playerPosition)

export const monsterInPixels = state => toPixels(state.monsterPosition)

export const targetInPixel = state => toPixels(state.targetPosition)

export const findMonsterPath = state => {
  const grid = new PF.Grid(grid2d(state))
  const finder = new PF.AStarFinder()

  return finder.findPath(...state.monsterPosition, ...state.playerPosition, grid)
}

export const findPlayerPath = state => {
  const grid = new PF.Grid(grid2d(state))
  const finder = new PF.AStarFinder()

  return finder.findPath(...state.playerPosition, ...state.targetPosition, grid)
}

export const moveToPixels = position => ({ type: 'MOVE_TO_PIXELS', payload: position })

export const modifyInPixels = position => ({ type: 'MODIFY_IN_PIXELS', payload: position })

const store = createStore(reducer)

tickEffect(store)

export default store
