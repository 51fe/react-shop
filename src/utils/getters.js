/**
 * locally find Product by ID
 * @param state
 * @param getters
 * @returns {Function}
 */
export const productById = (state, id) => {
  console.log(state)
  const items = state.product.items
  if (items.length > 1) {
    return items.find(p => p._id === id)
  } else {

    return state.product.item
  }
}

/**
 * locally find manufacturer By ID
 * @param state
 * @param getters
 * @returns {Function}
 */

export const manufacturerById = state => id => {
  const items = state.manufacturer.items
  if (items.length > 0) {
    return items.find(p => p._id === id)
  } else {
    return state.manufacturer.item
  }
}

/**
 * get Cart Items Count
 * @param state
 * @returns {number}
 */
export const getCartItemsCount = state => {
  let total = 0;
  state.cart.items.forEach(item => {
    total += parseInt(item.quantity);
  });
  return total;
}
/**
 * get sum price
 * @param state
 * @returns {*}
 */
export const getCartPriceSum = state =>
  state.cart.items.reduce((total, item) =>
    total + item.price * item.quantity,
    0
  )

/**
 * get item quantity put in the car
 * @param state
 * @param id
 * @returns {Number}
 */
export const getAddedQuantity =  (cart, id) => {
  const item = cart.find(p => p._id === id)
  if (item) {
    return item.quantity
  } else {
    return 0
  }
}

