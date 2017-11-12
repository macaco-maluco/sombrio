import React from 'react'

const Resurrect = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      cursor: 'pointer',
      backgroundColor: '#ACE000',
      padding: '20px 40px',
      borderWidth: 0,
      fontFamily: '"Helvetica", "Arial", "sans-serif"',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 24,
      borderRadius: 5,
    }}
  >
    RESURRECT
  </button>
)

const Tombstone = ({ width, height }) => {
  const size = Math.floor(Math.min(width, height) / 2)
  return (
    <svg viewBox="0 0 40 40" width={`${size}`} height={`${size}`}>
      <g id="gravestone" style={{ fill: '#b266ff' }}>
        <path
          d="M18.319335,0.00166666667 C15.9325483,0.00166666667 13.6915592,0.61475 11.73929,1.68533333 L15.2838292,3.33033333 L16.2722333,6.29208333 L14.9941217,6.71866667 L14.1900767,4.30816667 L10.38738,2.54383333 C6.90252583,5.02416667 4.62549192,9.08516667 4.62549192,13.69025 L4.62549192,13.69025 L4.62549192,33.7078333 L11.53911,33.7078333 L9.02684,30.56175 L7.559155,30.56175 L7.559155,29.2134167 L9.67466083,29.2134167 L10.7894467,30.6091667 L11.4882333,28.5111667 L13.5264358,27.4929167 L14.1286833,28.6973333 L12.5925033,29.468 L11.7936717,31.8644167 L13.2666608,33.7078333 L32.0412225,33.7078333 L32.0412225,32.27 L26.0528183,31.415 L23.1946608,27.6053333 L24.2743908,26.796 L24.75538,27.43675 L26.1125033,25.402 L27.2343008,26.1499167 L25.6138967,28.5796667 L26.7971775,30.158 L32.0412225,30.9058333 L32.0412225,13.6621667 C32.0412225,11.6579167 31.5921442,9.76058333 30.8157842,8.04775 L31.119515,8.95708333 L28.7002792,9.76291667 L27.93129,11.3008333 L26.7251775,10.6969167 L27.7452225,8.66041667 L30.6455375,7.69483333 C28.4183008,3.13533333 23.7453125,-0.00541666667 18.319335,1.86221409e-13 L18.319335,0.00166666667 Z"
          id="Shape"
        />
        <polygon id="Shape" points="0.131109833 35 36.535605 35 36.535605 40 0.131109833 40" />
      </g>
      <text style={{ fill: 'white', fontSize: 11, transform: 'translate(7px,18px)' }}>game</text>
      <text style={{ fill: 'white', fontSize: 11, transform: 'translate(9px,26px)' }}>over</text>
    </svg>
  )
}

const style = ({ width, height }) => ({
  position: 'absolute',
  width: width - 120,
  height: height - 120,
  left: 60,
  top: 60,
  backgroundColor: 'rgba(0,0,0,.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
})

const GameOverOverlay = ({ score, width, height, onResurrect }) => (
  <div style={style({ width, height })}>
    <Tombstone width={width} height={height} />
    <div style={{color: 'white'}}>
      <h1>You survived {score} seconds</h1>
      <Resurrect onClick={onResurrect} />
    </div>
  </div>
)

export default GameOverOverlay
