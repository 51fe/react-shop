import * as types from '../actions/actionTypes'

export default (state = {
  message: '',
  code: -1
}, action) => {
  switch (action.type) {
    case types.PRELOAD:
      return {
        message: '正在加载',
        code: -1
      }
    case types.LOADED:
      return {
        message: '加载成功',
        code: 1
      }
    case types.ERROR:
      return {
        message: action.message,
        code: 0
      }
    default:
      return state
  }
}

