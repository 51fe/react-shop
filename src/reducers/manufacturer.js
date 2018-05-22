import * as types from '../constants'

const initialState = {
  items: [],
  item: {}
}

export default (state = initialState, action) => {

  switch (action.type) {
    case types.GET_ALL_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        items: action.data,
      }

    case types.GET_MANUFACTURER_BY_ID_SUCCESS:
      return {
        ...state,
        item: action.data
      }

    case types.ADD_MANUFACTURER_SUCCESS:
      state.items.push(action.data)
      return state

    case types.UPDATE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        item: action.data
      }

    case types.REMOVE_MANUFACTURER_SUCCESS:
      const index = state.items.findIndex(p => p._id === action.data)
      state.items.splice(index, 1)
      return state

    default:
      return state
  }
}
