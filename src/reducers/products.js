import * as types from '../actions/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_SUCCESS:
      // Add quantity property cart reactivity
      return action.data.map(p => {
        return {
          ...p,
          quantity: 1
        }
      })

    case types.ADD_PRODUCT_SUCCESS:
      return [...state, { ...action.data }]

    case types.UPDATE_PRODUCT_SUCCESS:
      return state.map(item => (item._id === action.data._id ? action.data : item))

    case types.REMOVE_PRODUCT_SUCCESS:
      return state.filter(item => item._id !== action.data)

    default:
      return state
  }
}
