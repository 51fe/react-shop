// A polyfilled environment for React 16 using core-js to support older browsers (< IE11)
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/es6/array'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import App from './App'

import './assets/css/iconfont.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './assets/less/index.less'
import './assets/less/app.less'
//
render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)

