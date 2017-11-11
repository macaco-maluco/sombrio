import React from 'react'
import { Motion, spring } from 'react-motion'
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
  scale,
}) => (
  <Motion
    defaultStyle={{
      x: targetPosition[0],
      y: targetPosition[1],
    }}
    style={{
      x: spring(targetPosition[0], { stiffness: 20, damping: 15 }),
      y: spring(targetPosition[1], { stiffness: 20, damping: 15 }),
    }}
  >
    {style => {
      const x = style.x - width * scale / 2
      const y = style.y - height * scale / 2

      return (
        <svg
          viewBox={`${x} ${y} ${width * scale} ${height * scale}`}
          width={width}
          height={height}
          style={styles.svg}
          onContextMenu={e => onModify([e.clientX + x, e.clientY + y])}
          onClick={e => onMove([e.clientX + x, e.clientY + y])}
        >
          <Target position={targetPosition} />
          <Player position={playerPosition} />
          <Monster position={monsterPosition} />
          {objects.map(({ position }) => <Wall key={position.join('-')} position={position} />)}
        </svg>
      )
    }}
  </Motion>
)

const mapStateToProps = state => ({
  width: state.windowSize[0],
  height: state.windowSize[1],
  objects: objectsInPixes(state),
  playerPosition: playerInPixels(state),
  monsterPosition: monsterInPixels(state),
  targetPosition: targetInPixel(state),
  scale: state.scale,
})

const mapDispatchToProps = dispatch => ({
  onMove: positionInPixels => dispatch(moveToPixels(positionInPixels)),
  onModify: positionInPixels => dispatch(stageModificationInPixels(positionInPixels)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
