import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import product from './product'
import manufacturer from './manufacturer'
import status from './status'

import cart from "./cart";

export default combineReducers({
  status,
  toastr: toastrReducer,
  product,
  manufacturer,
  cart
})