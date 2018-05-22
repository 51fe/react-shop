import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers/index'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// 给增强后的store传入reducer
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

export default store
