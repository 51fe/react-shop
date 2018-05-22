import axios from 'axios'
import store  from '../store'
import * as types from '../constants'
import {toastr} from "react-redux-toastr";

// axios gloable setting
axios.defaults.timeout = 20000
axios.defaults.baseURL = 'http://localhost:4000/v1'

// http response interceptor
axios.interceptors.response.use(data => {
  return data
}, error => {
  console.log(error);
  toastr.error('消息', error.toString())
  store.dispatch({type: types.ERROR})
  return Promise.reject(error)
})

export default axios
