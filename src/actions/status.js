import * as types from '../constants'

export const startLoad = ()  => ({
  type: types.LOADED,
})

export const endLoad = ()  => ({
  type: types.LOADED,
})

export const handleError = message  => ({
  type: types.ERROR,
  message
})
