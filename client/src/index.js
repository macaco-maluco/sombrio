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

tick(store)
// ipc(store)
resize(store)
subscribe(store, [publishTombstone, publishWall])

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
