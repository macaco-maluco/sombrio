import React from 'react'
import { connect } from 'react-redux'
import {
  moveToPixels,
  stageModificationInPixels,
  objectsInPixes,
  playerInPixels,
  monsterInPixels,
  targetInPixel,
} from '../store'

const styles = {
  svg: {
    background: '#2E2727',
  },
}

const gridUnit = 60

const Wall = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <path d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Target = ({ position }) => (
  <g
    style={{
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <path
      stroke="blue"
      strokeWidth="4"
      fill="none"
      d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`}
    />
  </g>
)

const Player = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <path fill="blue" d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Monster = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <path fill="red" d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const App = ({
  width,
  height,
  objects,
  playerPosition,
  monsterPosition,
  targetPosition,
  onMove,
  onModify,
}) => (
  <svg
    width={width}
    height={height}
    style={styles.svg}
    onContextMenu={e => onModify([e.clientX, e.clientY])}
    onClick={e => onMove([e.clientX, e.clientY])}
  >
    <Target position={targetPosition} />
    <Player position={playerPosition} />
    <Monster position={monsterPosition} />
    {objects.map(({ position }) => <Wall key={position.join('-')} position={position} />)}
  </svg>
)

const mapStateToProps = state => ({
  width: state.windowSize[0],
  height: state.windowSize[1],
  objects: objectsInPixes(state),
  playerPosition: playerInPixels(state),
  monsterPosition: monsterInPixels(state),
  targetPosition: targetInPixel(state),
})

const mapDispatchToProps = dispatch => ({
  onMove: positionInPixels => dispatch(moveToPixels(positionInPixels)),
  onModify: positionInPixels => dispatch(stageModificationInPixels(positionInPixels)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
