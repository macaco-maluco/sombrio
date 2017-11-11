import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import tick from './effects/tick'
import ipc from './effects/ipc'
import resize from './effects/resize'

tick(store)
ipc(store)
resize(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
