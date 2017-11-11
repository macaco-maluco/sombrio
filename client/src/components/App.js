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

export default ({ width, height, objects }) => (
  <svg width={width} height={height} style={styles.svg}>
    {objects.map(({ x, y }) => <Wall x={x} y={y} />)}
  </svg>
)
