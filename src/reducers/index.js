import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr';

import products from './products'
import product from './product'
import manufacturers from './manufacturers'
import cart from './cart'
import status from './status'

export default combineReducers({
  status,
  toastr: toastrReducer,
  products,
  product,
  manufacturers,
  cart
})
