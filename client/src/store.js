import { range, equals } from 'ramda'
import PF from 'pathfinding'
import { createStore } from 'redux'
import uuid from 'uuid/v4'

export const initialState = {
  windowSize: [window.innerWidth, window.innerHeight],
  scale: 1,
  gridSize: 60,
  playerPosition: [3, 6],
  targetPosition: [4, 4],
  monsterPosition: [8, 6],
  stagedModifications: [],
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
    case 'STAGE_MODIFICATION_IN_PIXELS': {
      return {
        ...state,
        stagedModifications: [
          ...state.stagedModifications,
          { id: uuid(), type: 'wall', position: fromPixels(action.payload) },
        ],
      }
    }

    case 'MOVE_TO_PIXELS': {
      const targetPosition = fromPixels(action.payload)
      targetPosition[0] = Math.min(Math.max(targetPosition[0], 0), 200)
      targetPosition[1] = Math.min(Math.max(targetPosition[1], 0), 200)

      return {
        ...state,
        targetPosition: targetPosition,
      }
    }

    case 'COMMIT_MODIFICATION': {
      const position = action.payload

      const stagedModifications = state.stagedModifications.filter(
        object => !equals(object.position, position)
      )

      const objects = state.objects.filter(object => !equals(object.position, position))

      return {
        ...state,
        stagedModifications,
        objects:
          objects.length !== state.objects.length
            ? objects
            : [...state.objects, { type: 'wall', position }],
      }
    }

    case 'RESIZE_WINDOW': {
      return {
        ...state,
        windowSize: action.payload,
      }
    }

    case 'TICK': {
      // make the state available in the window for debugging
      window.state = state

      return {
        ...state,
        monsterPosition: findMonsterPath(state)[1] || state.monsterPosition,
        playerPosition: findPlayerPath(state)[1] || state.playerPosition,
      }
    }

    default: {
      return state
    }
  }
}

const createGrid = ([width, height]) => range(0, height).map(line => range(0, width).map(() => 0))

export const getSize = state => fromPixels(state.windowSize)

export const grid2d = state => {
  const emptyGrid = createGrid([200, 200])

  return allValidObjects(state).reduce((grid, object) => {
    grid[object.position[1]][object.position[0]] = 1
    return grid
  }, emptyGrid)
}

export const getFirstStagedModification = state => state.stagedModifications[0]

export const toPixels = x => x.map(y => y * 60)
export const fromPixels = x => x.map(y => Math.floor(y / 60))

export const allValidObjects = state =>
  state.stagedModifications
    .reduce((objects, stagedModification) => {
      const filteredObjects = objects.filter(
        object => !equals(object.position, stagedModification.position)
      )

      return filteredObjects.length !== objects.length
        ? filteredObjects
        : [...objects, stagedModification]
    }, state.objects)
    .filter(
      object =>
        object.position[0] > -1 &&
        object.position[0] < 200 &&
        object.position[1] > -1 &&
        object.position[0] < 200
    )

export const objectsInPixes = state =>
  allValidObjects(state).map(object => ({ ...object, position: toPixels(object.position) }))

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

export const stageModificationInPixels = position => ({
  type: 'STAGE_MODIFICATION_IN_PIXELS',
  payload: position,
})

export const commitModification = position => ({ type: 'COMMIT_MODIFICATION', payload: position })

export const tick = () => ({
  type: 'TICK',
  payload: Date.now(),
})

export const resizeWindow = size => ({ type: 'RESIZE_WINDOW', payload: size })

const store = createStore(reducer)

export default store
