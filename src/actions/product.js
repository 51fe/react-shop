import axios from './axois'
import * as types from '../constants'

export const getAllProducts = () => async (dispatch) => {
  dispatch({type: types.PRELOAD})
  // Fetch actual products from the API
  const response = await axios.get('products')
  await dispatch({
    type: types.GET_ALL_PRODUCTS_SUCCESS,
    data: response.data || []
  })
  dispatch({type: types.LOADED})
}

export const getProductById = (id) => async (dispatch) => {
  dispatch({type: types.PRELOAD})

  // Fetch product by ID from API
  const response = await axios.get(`products/${id}`)
  // Add quantity property cart reactivity
  await dispatch({
    type: types.GET_PRODUCT_BY_ID_SUCCESS,
    data: response.data
  })
  dispatch({type: types.LOADED})
}

export const addProduct = (payload) => async (dispatch) => {
  dispatch({type: types.PRELOAD})
  // Create a new product via API
  const response = await axios.post('products', payload)
  await dispatch({
    type: types.ADD_PRODUCT_SUCCESS,
    data: response.data
  })
}

export const updateProduct = (payload) => async (dispatch) => {
  dispatch({type: types.PRELOAD})
  // Update product via API
  const response = await axios.put(`products/${payload._id}`, payload)
  await dispatch({
    type: types.UPDATE_PRODUCT_SUCCESS,
    data: response.data
  })
}

export const removeProduct = (id) => async (dispatch) => {
  // Delete product via API
  const response = await axios.delete(`products/${id}`)
  await dispatch({
    type: types.REMOVE_PRODUCT_SUCCESS,
    data: response.data
  })
  dispatch({type: types.LOADED})
}
