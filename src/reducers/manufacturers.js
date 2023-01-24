import * as types from '../actions/actionTypes'

export default (state = [], action) => {

  switch (action.type) {
    case types.GET_ALL_MANUFACTURERS_SUCCESS:
      return action.data;

    case types.ADD_MANUFACTURER_SUCCESS:
      return [...state, { ...action.data }]

    case types.UPDATE_MANUFACTURER_SUCCESS:
      return state.map(item => (item._id === action.data._id ? action.data : item));

    case types.REMOVE_MANUFACTURER_SUCCESS:
      return state.filter(item => item._id !== action.data)

    default:
      return state
  }
}
