import request from './request'
import * as types from './actionTypes'
import { startLoad, endLoad, handleError } from './status';

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch(startLoad())
    // Fetch product by ID from API
    const response = await request.get(`products/${id}`)
    // Add quantity property cart reactivity
    await dispatch({
      type: types.GET_PRODUCT_BY_ID_SUCCESS,
      data: response.data
    })
    dispatch(endLoad())
  } catch (error) {
    dispatch(handleError(error))
  }
}
