import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App'

import './assets/css/iconfont.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './styles/index.less'
import './styles/app.less'

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

