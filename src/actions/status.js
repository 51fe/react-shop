import * as types from './actionTypes'

export const startLoad = () => ({
  type: types.PRELOAD,
})

export const endLoad = () => ({
  type: types.LOADED,
})

export const handleError = () => ({
  type: types.ERROR
})
