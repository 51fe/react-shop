import * as types from '../actions/actionTypes'

const initialState =
  {
    items: JSON.parse(localStorage.getItem('CART')) || [],
    count: 1
  }

/**
 * Add item(s) to cart
 * @param state
 * @param product
 * @param many
 */
const addToCart = (state, data, many = false) => {
  const items = [...state.items]
  const found = items.find(item => {
    return item._id === data._id
  })
  const count = many ? state.count : 1
  // add
  if (!found) {
   items.unshift({...data, quantity: count })
  } else { // update
    found.quantity += count
  }
  localStorage.setItem('CART', JSON.stringify(items))
  return items
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CART_ITEMS:
      return {
        ...state,
        items: addToCart(state, action.item, true)
      }

    case types.ADD_CART_ITEM:
      return {
        ...state,
        items: addToCart(state, action.item)
      }

    case types.REMOVE_CART_ITEM:
      // Called when removing one item from cart
      const items = state.items.filter(item => item._id !== action.id);
      localStorage.setItem('CART', JSON.stringify(items))
      return {
        ...state,
        items
      }

    /**
     * update cart item count
     * @param state
     * @param item
     */
    case types.UPDATE_CART_ITEM:
      const payload = action.item
      const updateItems = state.items.map(item => (item._id === payload.id ? {
        ...item,
        quantity: payload.count
      } : item))
      localStorage.setItem('CART', JSON.stringify(updateItems));
      return {
        ...state,
        items: updateItems
      }

    /**
     * Changing count to prepare to update cart
     * @param state
     * @param count
     */
    case types.WILL_UPDATE_CART_ITEM:
      // Changing count to prepare to update cart
      return {
        ...state,
        count: action.count
      }

    default:
      return state
  }
}
