import axios from './axois'
import * as types from '../constants'

export const getAllManufacturers = () => async (dispatch) => {
  dispatch({type: 'PRELOAD'})
  // Fetch actual manufacturers from the API
  const response = await axios.get('manufacturers')
  await dispatch({
    type: types.GET_ALL_MANUFACTURERS_SUCCESS,
    data: response.data
  })
  dispatch({type: types.LOADED})
}

export const getManufacturerById = (id) => async (dispatch) => {
  dispatch({type: 'PRELOAD'})
  // Fetch manufacturer by ID from API
  const response = await axios.get(`manufacturers/${id}`)
  await dispatch({
    type: types.GET_MANUFACTURER_BY_ID_SUCCESS,
    data: response.data
  })
  dispatch({type: types.LOADED})
}

export const addManufacturer = (payload) => async (dispatch) => {
  dispatch({type: 'PRELOAD'})
  // Create a new manufacturer via API
  const response = await axios.post('manufacturers', payload)
  await dispatch({
    type: types.ADD_MANUFACTURER_SUCCESS,
    data: response.data
  })
}

export const updateManufacturer = (payload) => async (dispatch) => {
  dispatch({type: 'PRELOAD'})
  // Update manufacturer via API
  const response = await axios.put(`manufacturers/${payload._id}`, payload)
  await dispatch({
    type: types.UPDATE_MANUFACTURER_SUCCESS,
    data: response.data
  })
}

export const removeManufacturer = (id) => async (dispatch) => {
  dispatch({type: 'PRELOAD'})
  // Delete manufacturer via API
  const response = await axios.delete(`manufacturers/${id}`)
  await dispatch({
    type: types.REMOVE_MANUFACTURER_SUCCESS,
    data: response.data
  })
  dispatch({type: types.LOADED})
}
