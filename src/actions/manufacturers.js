import request from './request'
import * as types from './actionTypes'
import { startLoad, endLoad, handleError } from './status';

export const getAllManufacturers = () => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Fetch actual manufacturers from the API
    const { data } = await request.get('manufacturers')
    await dispatch({
      type: types.GET_ALL_MANUFACTURERS_SUCCESS,
      data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const addManufacturer = (payload) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Create a new manufacturer via API
    const { data } = await request.post('manufacturers', payload)
    await dispatch({
      type: types.ADD_MANUFACTURER_SUCCESS,
      data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const updateManufacturer = (payload) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Update manufacturer via API
    const { data } = await request.put(`manufacturers/${payload._id}`, payload)
    await dispatch({
      type: types.UPDATE_MANUFACTURER_SUCCESS,
      data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const removeManufacturer = (id) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Delete manufacturer via API
    const { data } = await request.delete(`manufacturers/${id}`)
    await dispatch({
      type: types.REMOVE_MANUFACTURER_SUCCESS,
      data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}
