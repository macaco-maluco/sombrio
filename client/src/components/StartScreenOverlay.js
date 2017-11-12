import React from 'react'

const StartGame = ({ onClick }) => (
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
    START
  </button>
)

const Monster = ({ width, height }) => {
  const size = Math.floor(Math.min(width, height) / 2)
  return (
    <svg viewBox="0 0 40 40" width={`${size}`} height={`${size}`}>
      <g id="monster" style={{transform: 'translate(5px, 0)', fill: '#ACE000' }}>
        <path d="M8.70967742,6.19354839 C10.1290323,5.90322581 11.2258065,4.64516129 11.2258065,3.12903226 C11.2258065,1.41935484 9.80645161,3.55271368e-15 8.06451613,3.55271368e-15 C6.32258065,3.55271368e-15 4.90322581,1.38709677 4.90322581,3.12903226 C4.90322581,4.64516129 6,5.90322581 7.41935484,6.19354839 L7.41935484,10.0322581 C7.83870968,9.80645161 8.25806452,9.58064516 8.70967742,9.38709677 L8.70967742,6.19354839 Z" />
        <path d="M21.6129032,6.19354839 C23.0322581,5.90322581 24.1290323,4.64516129 24.1290323,3.12903226 C24.1290323,1.41935484 22.7096774,3.55271368e-15 20.9677419,3.55271368e-15 C19.2258065,3.55271368e-15 17.8064516,1.38709677 17.8064516,3.12903226 C17.8064516,4.64516129 18.8709677,5.90322581 20.3225806,6.19354839 L20.3225806,9.38709677 C20.7741935,9.58064516 21.1935484,9.80645161 21.6129032,10.0322581 L21.6129032,6.19354839 Z" />
        <path d="M17,24.1935484 C17,25.5483871 15.8709677,26.6451613 14.516129,26.6451613 C13.1612903,26.6451613 12.0322581,25.5483871 12.0322581,24.1935484 C12.0322581,22.8387097 13.1612903,21.7419355 14.516129,21.7419355 C15.8709677,21.7419355 17,22.8387097 17,24.1935484 Z" />
        <path d="M21.6129032,11.3225806 C21.1935484,11.0967742 20.7741935,10.8709677 20.3225806,10.6774194 C18.5483871,9.90322581 16.5806452,9.4516129 14.516129,9.4516129 C12.4516129,9.4516129 10.483871,9.90322581 8.70967742,10.6774194 C8.25806452,10.8709677 7.83870968,11.0967742 7.41935484,11.3225806 C3.16129032,13.7419355 0.290322581,18.2903226 0.290322581,23.4516129 L0.290322581,35.1935484 C0.290322581,36.6129032 1.03225806,37.8709677 2.29032258,38.5806452 C3.58064516,39.2903226 5.06451613,39.2580645 6.32258065,38.483871 C7.19354839,37.9354839 8.29032258,37.9354839 9.16129032,38.483871 C10.8064516,39.516129 12.6774194,40 14.5483871,40 C16.4193548,40 18.2903226,39.483871 19.9354839,38.483871 C20.8064516,37.9354839 21.9032258,37.9354839 22.7741935,38.483871 C24,39.2580645 25.516129,39.2903226 26.8064516,38.5806452 C28.0645161,37.8709677 28.8064516,36.6129032 28.8064516,35.1935484 L28.8064516,23.4516129 C28.7419355,18.2580645 25.8709677,13.7419355 21.6129032,11.3225806 Z M14.516129,29.483871 C11.0645161,29.483871 8.22580645,26.7096774 8.22580645,23.2903226 C8.22580645,19.8709677 11.0322581,17.0967742 14.516129,17.0967742 C18,17.0967742 20.8064516,19.8709677 20.8064516,23.2903226 C20.8064516,26.6774194 17.9677419,29.483871 14.516129,29.483871 Z" />
      </g>
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

const StartScreenOverlay = ({ width, height, onStart }) => (
  <div style={style({ width, height })}>
    <Monster width={width} height={height} />
    <div style={{width: (width / 2) - 180, fontSize: 18, color: 'white'}}>
      <h1>Welcome to Sombrio</h1>
      <p>There is a Monster chasing you. Your objective is escaping your horrible fate by running around the strange Maze Reality you are in while building/removing walls. The longer you survive the better ;) </p>

      <p>Some walls will vanish or appear now and then, blocking your way or heping you (who knows, huh?). It is the very magical nature of the Maze Reality affecting you. Only this is not completely true.</p>

      <p>Sombrio is a peer-to-peer game built on top of SSB (Secure Scuttlebut), just gather your friends and play on a Local Network (LAN).</p>
      <p style={{paddingTop: 20}}>
        <StartGame onClick={onStart} />
      </p>
    </div>
  </div>
)

export default StartScreenOverlay
