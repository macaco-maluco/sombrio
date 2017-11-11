import React from 'react'

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

export default ({ width, height, objects, playerPosition, monsterPosition }) => (
  <svg width={width} height={height} style={styles.svg}>
    <Player position={playerPosition} />
    <Monster position={monsterPosition} />
    {objects.map(({ position }) => <Wall position={position} />)}
  </svg>
)
