import React from 'react'
import { connect } from 'react-redux'
import {
  clickScreen,
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
  <g style={{ transform: `translate(${position[0]}px, ${position[1]}px)` }}>
    <path d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Target = ({ position }) => (
  <g style={{ transform: `translate(${position[0]}px, ${position[1]}px)` }}>
    <path
      stroke="blue"
      strokeWidth="4"
      fill="none"
      d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`}
    />
  </g>
)

const Player = ({ position }) => (
  <g style={{ transform: `translate(${position[0]}px, ${position[1]}px)` }}>
    <path fill="blue" d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Monster = ({ position }) => (
  <g style={{ transform: `translate(${position[0]}px, ${position[1]}px)` }}>
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
  onClick,
}) => (
  <svg
    width={width}
    height={height}
    style={styles.svg}
    onClick={e => onClick([e.clientX, e.clientY])}
  >
    <Target position={targetPosition} />
    <Player position={playerPosition} />
    <Monster position={monsterPosition} />
    {objects.map(({ position }) => <Wall position={position} />)}
  </svg>
)

const mapStateToProps = state => ({
  width: state.window.width,
  height: state.window.height,
  objects: objectsInPixes(state),
  playerPosition: playerInPixels(state),
  monsterPosition: monsterInPixels(state),
  targetPosition: targetInPixel(state),
})

const mapDispatchToProps = dispatch => ({
  onClick: positionInPixels => dispatch(clickScreen(positionInPixels)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
