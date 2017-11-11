import React from 'react'

const styles = {
  svg: {
    background: '#2E2727',
  },
}

const gridUnit = 60

const Wall = ({ x, y }) => (
  <g style={{ transform: `translate(${x}px, ${y}px)` }}>
    <path d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Player = ({ x, y }) => (
  <g style={{ transform: `translate(${x}px, ${y}px)` }}>
    <path fill="blue" d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

const Monster = ({ x, y }) => (
  <g style={{ transform: `translate(${x}px, ${y}px)` }}>
    <path fill="red" d={`M0,0 ${gridUnit},0 ${gridUnit},${gridUnit} 0,${gridUnit}`} />
  </g>
)

export default ({ width, height, objects, playerPosition, monsterPosition }) => (
  <svg width={width} height={height} style={styles.svg}>
    <Player x={playerPosition.x} y={playerPosition.y} />
    <Monster x={monsterPosition.x} y={monsterPosition.y} />
    {objects.map(({ x, y }) => <Wall x={x} y={y} />)}
  </svg>
)
