import { range, equals, uniq } from 'ramda'
import PF from 'pathfinding'
import { createStore } from 'redux'
import uuid from 'uuid/v4'

const GRID_SIZE = 200

const randomPosition = referencePosition => {
  const angle = Math.random() * Math.PI * 2
  return [
    referencePosition[0] + Math.floor(Math.sin(angle) * 10),
    referencePosition[1] + Math.floor(Math.cos(angle) * 10),
  ]
}

const playerPosition = [GRID_SIZE / 2, GRID_SIZE / 2]

export const initialState = {
  windowSize: [window.innerWidth, window.innerHeight],
  scale: 1,
  gridSize: 60,
  playerPosition,
  scores: [],
  targetPosition: [GRID_SIZE / 2 - 3, GRID_SIZE / 2 + 3],
  monsterPosition: randomPosition(playerPosition),
  tickCount: 0,
  stagedModifications: [],
  gameOverTimestamp: null,
  currentTime: Date.now(),
  startTimestamp: Date.now(),
  gameOver: false,
  started: false,
  tombstones: [],
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
    case 'SET_PLAYER_ID': {
      return {
        ...state,
        playerId: action.payload,
      }
    }

    case 'START': {
      return {
        ...state,
        started: true,
        startTimestamp: action.payload,
      }
    }

    case 'ARISE!!': {
      return {
        ...state,
        gameOver: false,
        startTimestamp: action.payload,
        playerPosition: initialState.playerPosition,
        targetPosition: initialState.targetPosition,
        monsterPosition: randomPosition(initialState.playerPosition),
      }
    }

    case 'ADD_SCORE': {
      return {
        ...state,
        scores: [
          ...state.scores,
          { playerId: action.payload.playerId, score: action.payload.score },
        ],
      }
    }

    case 'ADD_TOMBSTONE': {
      return {
        ...state,
        tombstones: [...state.tombstones, { type: 'tombstone', position: action.payload }],
      }
    }

    case 'STAGE_MODIFICATION_IN_PIXELS': {
      if (state.gameOver || !state.started) {
        return state
      }

      return {
        ...state,
        stagedModifications: [
          ...state.stagedModifications,
          { id: uuid(), type: 'wall', position: fromPixels(action.payload) },
        ],
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

    case 'MOVE_TO_PIXELS': {
      if (state.gameOver || !state.started) {
        return state
      }

      const targetPosition = fromPixels(action.payload)
      targetPosition[0] = Math.min(Math.max(targetPosition[0], 0), GRID_SIZE)
      targetPosition[1] = Math.min(Math.max(targetPosition[1], 0), GRID_SIZE)

      return {
        ...state,
        targetPosition: targetPosition,
      }
    }

    case 'RESIZE_WINDOW': {
      return {
        ...state,
        windowSize: action.payload,
      }
    }

    case 'TICK': {
      if (state.gameOver || !state.started) {
        return {
          ...state,
          currentTime: action.payload,
        }
      }

      // FIXME: check also if they will collide in the next
      // make the state available in the window for debugging
      window.state = state

      const monsterPosition = calculateMonsterPosition(state)

      const playerPosition =
        state.tickCount % 3 === 0
          ? findPlayerPath(state)[1] || state.playerPosition
          : state.playerPosition

      const wallPosition = allValidObjects(state).find(obj => equals(obj.position, monsterPosition))
      if (wallPosition) {
        return {
          ...state,
          playerPosition,
          tickCount: state.tickCount + 1,
          currentTime: action.payload,
          stagedModifications: [
            ...state.stagedModifications,
            { id: uuid(), type: 'wall', position: wallPosition.position },
          ],
        }
      }

      const gameOver = equals(monsterPosition, playerPosition)

      return {
        ...state,
        monsterPosition,
        playerPosition,
        currentTime: action.payload,
        gameOverTimestamp: gameOver ? action.payload : state.gameOverTimestamp,
        gameOver: equals(monsterPosition, playerPosition),
        tickCount: state.tickCount + 1,
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
  const emptyGrid = createGrid([GRID_SIZE, GRID_SIZE])

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
        object.position[0] < GRID_SIZE &&
        object.position[1] > -1 &&
        object.position[0] < GRID_SIZE
    )

export const objectsInPixes = state =>
  allValidObjects(state).map(object => ({ ...object, position: toPixels(object.position) }))

export const tombstonesInPixels = state =>
  uniq(state.tombstones).map(object => ({ ...object, position: toPixels(object.position) }))

export const playerInPixels = state => toPixels(state.playerPosition)

export const monsterInPixels = state => toPixels(state.monsterPosition)

export const targetInPixel = state => toPixels(state.targetPosition)

export const findMonsterPath = state => {
  const grid = new PF.Grid(grid2d(state))
  const finder = new PF.AStarFinder()

  return finder.findPath(...state.monsterPosition, ...state.playerPosition, grid)
}

export const getLeaderboard = state =>
  [...state.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(score => ({
      ...score,
      playerId: score.playerId === state.playerId ? 'me' : score.playerId,
    }))

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

export const setPlayerId = id => ({ type: 'SET_PLAYER_ID', payload: id })

export const tick = () => ({
  type: 'TICK',
  payload: Date.now(),
})

export const resurrect = () => ({
  type: 'ARISE!!',
  payload: Date.now(),
})

export const start = () => ({
  type: 'START',
  payload: Date.now(),
})

export const addTombstone = position => ({ type: 'ADD_TOMBSTONE', payload: position })

export const addScore = scoreWithPlayerId => ({ type: 'ADD_SCORE', payload: scoreWithPlayerId })

export const resizeWindow = size => ({ type: 'RESIZE_WINDOW', payload: size })

const calculateMonsterPosition = state => {
  if (state.tickCount % 2 !== 0) {
    return state.monsterPosition
  }

  const availablePath = findMonsterPath(state)

  if (availablePath.length > 0) {
    return availablePath[1]
  }

  return findIdealMonsterPath(state)[1]
}

const findIdealMonsterPath = state => {
  const grid = new PF.Grid(createGrid([GRID_SIZE, GRID_SIZE]))
  const finder = new PF.AStarFinder()

  return finder.findPath(...state.monsterPosition, ...state.playerPosition, grid)
}

export const calculateScore = state =>
  Math.max(
    Math.floor(
      (state.gameOver
        ? state.gameOverTimestamp - state.startTimestamp
        : state.currentTime - state.startTimestamp) / 1000
    ),
    0
  )

const store = createStore(reducer)

export default store
