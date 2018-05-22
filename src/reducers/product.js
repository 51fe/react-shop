import * as types from '../constants'

const initialState = {
  items: [],
  item: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_SUCCESS:
      // Add quantity property cart reactivity
      const arr = action.data.map(p => {
        return {
          ...p,
          quantity: 1
        }
      })
      return {
        ...state,
        items: arr,
      }

    case types.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        item: action.data,
      }

    case types.ADD_PRODUCT_SUCCESS:
      state.items.push(action.data)
      return state

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        item: action.data,
      }

    case types.REMOVE_PRODUCT_SUCCESS:
      const index = state.items.findIndex(p => p._id === action._id)
      state.items.splice(index, 1)
      return state

    default:
      return state
  }
}
