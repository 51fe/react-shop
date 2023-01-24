import request from './request'
import * as types from './actionTypes'
import { startLoad, endLoad, handleError } from './status';


export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Fetch actual products from the API
    const response = await request.get('products')
    await dispatch({
      type: types.GET_ALL_PRODUCTS_SUCCESS,
      data: response.data || []
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const addProduct = (payload) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Create a new product via API
    const response = await request.post('products', payload)
    await dispatch({
      type: types.ADD_PRODUCT_SUCCESS,
      data: response.data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const updateProduct = (payload) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Update product via API
    const response = await request.put(`products/${payload._id}`, payload)
    await dispatch({
      type: types.UPDATE_PRODUCT_SUCCESS,
      data: response.data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}

export const removeProduct = (id) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Delete product via API
    const response = await request.delete(`products/${id}`)
    await dispatch({
      type: types.REMOVE_PRODUCT_SUCCESS,
      data: response.data
    })
    dispatch({ type: types.LOADED })
  } catch (error) {
    dispatch(handleError(error))
  }
}
