import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import subscribe from 'redux-heat'
import App from './components/App'
import store from './store'
import tick from './effects/tick'
import ipc from './effects/ipc'
import resize from './effects/resize'
import publishTombstone from './heats/publishTombstone'
import publishWall from './heats/publishWall'
import indieFlowerFont from './IndieFlower.ttf'
import digitaldreamfat from './digitaldreamfat.ttf'

tick(store)
ipc(store)
resize(store)
subscribe(store, [publishTombstone, publishWall])

render(
  <Provider store={store}>
    <div>
      <style>
        {`@font-face {
      font-family: 'Indie Flower';
      src: url('${indieFlowerFont}')  format('truetype');
    }`}
      </style>
      <style>
        {`@font-face {
      font-family: 'Digital Dream';
      src: url('${digitaldreamfat}')  format('truetype');
    }`}
      </style>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
