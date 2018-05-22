import * as types from '../constants'

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
const addToCart = (state, item, many = false) => {
  const record = state.items.find(p => {
    return p._id === item._id
  })
  if (!record) {
    state.items.push({
      ...item,
      quantity: state.count
    })
  } else {
    if (many) {
      record.quantity += state.count
    } else {
      record.quantity += 1
    }
  }
  localStorage.setItem('CART', JSON.stringify(state.items));
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CART_ITEMS:
      addToCart(state, action.item, true)
      return {
        ...state,
      }

    case types.ADD_CART_ITEM:
      addToCart(state, action.item)
      console.log(...state);
      return {
        ...state,
      }

    case types.REMOVE_CART_ITEM:
      // Called when removing one item from cart
      const index = state.items.findIndex(p => p._id === action.id)
      state.items.splice(index, 1);
      // localStorage.setItem('CART', JSON.stringify(state.items));
      return {
        ...state,
      }

    /**
     * update cart item count
     * @param state
     * @param item
     */
    case types.UPDATE_CART_ITEM:
      let product = state.items.find(p => p._id === action.item.id)
      if (product) {
        product.quantity = action.item.count
      }
      localStorage.setItem('CART', JSON.stringify(state.items));
      return {
        ...state
      }

    /**
     * Changing count to prepare to update cart
     * @param state
     * @param count
     */
    case types.WILL_UPDATE_CART_ITEM:
      // Changing count to prepare to update cart
      state.count = action.count
      return {
        ...state
      }

    default:
      return state
  }
}
