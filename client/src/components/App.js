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
    <g id="player" style={{ transform: 'translate(5px, 16px)', fill: '#6600CC' }}>
      <path
        d="M36.0119048,0.416666667 C31.4880952,0.416666667 27.2619048,2.73809524 24.8214286,6.42857143 C22.3809524,2.73809524 18.1547619,0.416666667 13.6309524,0.416666667 C6.25,0.416666667 0.238095238,6.42857143 0.238095238,13.8095238 C0.238095238,21.1904762 6.25,27.202381 13.6309524,27.202381 C18.1547619,27.202381 22.3809524,24.8809524 24.8214286,21.1904762 C27.2619048,24.8809524 31.4880952,27.202381 36.0119048,27.202381 C43.3928571,27.202381 49.4047619,21.1904762 49.4047619,13.8095238 C49.4047619,6.42857143 43.452381,0.416666667 36.0119048,0.416666667 Z M36.0119048,24.8809524 C31.6666667,24.8809524 27.6785714,22.2619048 25.8928571,18.2738095 L24.8214286,15.7738095 L23.75,18.2738095 C21.9642857,22.2619048 18.0357143,24.8809524 13.6309524,24.8809524 C7.55952381,24.8809524 2.61904762,19.9404762 2.61904762,13.8690476 C2.61904762,7.79761905 7.55952381,2.85714286 13.6309524,2.85714286 C17.9761905,2.85714286 21.9642857,5.41666667 23.75,9.46428571 L24.8214286,11.9642857 L25.8928571,9.46428571 C27.6785714,5.47619048 31.6071429,2.85714286 36.0119048,2.85714286 C42.0833333,2.85714286 47.0238095,7.79761905 47.0238095,13.8690476 C47.0238095,19.9404762 42.1428571,24.8809524 36.0119048,24.8809524 Z"
        id="Shape"
      />
      <circle
        cx="13.9954643"
        cy="14.1338929"
        id="Oval"
        r="5.89303422"
        transform="translate(13.995464, 14.133893) rotate(-65.626222) translate(-13.995464, -14.133893)"
        style={{ fill: '#f7f7f7' }}
      />
      <circle
        cx="36.0119048"
        cy="14.1071429"
        id="Oval"
        r="5.89285714"
        style={{ fill: '#f7f7f7' }}
      />
    </g>
  </g>
)

const Monster = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g id="monster" style={{ transform: 'translate(16px, 12px)', fill: '#ACE000' }}>
      <path d="M8.70967742,6.19354839 C10.1290323,5.90322581 11.2258065,4.64516129 11.2258065,3.12903226 C11.2258065,1.41935484 9.80645161,3.55271368e-15 8.06451613,3.55271368e-15 C6.32258065,3.55271368e-15 4.90322581,1.38709677 4.90322581,3.12903226 C4.90322581,4.64516129 6,5.90322581 7.41935484,6.19354839 L7.41935484,10.0322581 C7.83870968,9.80645161 8.25806452,9.58064516 8.70967742,9.38709677 L8.70967742,6.19354839 Z" />
      <path d="M21.6129032,6.19354839 C23.0322581,5.90322581 24.1290323,4.64516129 24.1290323,3.12903226 C24.1290323,1.41935484 22.7096774,3.55271368e-15 20.9677419,3.55271368e-15 C19.2258065,3.55271368e-15 17.8064516,1.38709677 17.8064516,3.12903226 C17.8064516,4.64516129 18.8709677,5.90322581 20.3225806,6.19354839 L20.3225806,9.38709677 C20.7741935,9.58064516 21.1935484,9.80645161 21.6129032,10.0322581 L21.6129032,6.19354839 Z" />
      <path d="M17,24.1935484 C17,25.5483871 15.8709677,26.6451613 14.516129,26.6451613 C13.1612903,26.6451613 12.0322581,25.5483871 12.0322581,24.1935484 C12.0322581,22.8387097 13.1612903,21.7419355 14.516129,21.7419355 C15.8709677,21.7419355 17,22.8387097 17,24.1935484 Z" />
      <path d="M21.6129032,11.3225806 C21.1935484,11.0967742 20.7741935,10.8709677 20.3225806,10.6774194 C18.5483871,9.90322581 16.5806452,9.4516129 14.516129,9.4516129 C12.4516129,9.4516129 10.483871,9.90322581 8.70967742,10.6774194 C8.25806452,10.8709677 7.83870968,11.0967742 7.41935484,11.3225806 C3.16129032,13.7419355 0.290322581,18.2903226 0.290322581,23.4516129 L0.290322581,35.1935484 C0.290322581,36.6129032 1.03225806,37.8709677 2.29032258,38.5806452 C3.58064516,39.2903226 5.06451613,39.2580645 6.32258065,38.483871 C7.19354839,37.9354839 8.29032258,37.9354839 9.16129032,38.483871 C10.8064516,39.516129 12.6774194,40 14.5483871,40 C16.4193548,40 18.2903226,39.483871 19.9354839,38.483871 C20.8064516,37.9354839 21.9032258,37.9354839 22.7741935,38.483871 C24,39.2580645 25.516129,39.2903226 26.8064516,38.5806452 C28.0645161,37.8709677 28.8064516,36.6129032 28.8064516,35.1935484 L28.8064516,23.4516129 C28.7419355,18.2580645 25.8709677,13.7419355 21.6129032,11.3225806 Z M14.516129,29.483871 C11.0645161,29.483871 8.22580645,26.7096774 8.22580645,23.2903226 C8.22580645,19.8709677 11.0322581,17.0967742 14.516129,17.0967742 C18,17.0967742 20.8064516,19.8709677 20.8064516,23.2903226 C20.8064516,26.6774194 17.9677419,29.483871 14.516129,29.483871 Z" />
    </g>
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
          <rect stroke="black" fill="none" x={0} y={0} width={200 * 60} height={200 * 60} />
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
