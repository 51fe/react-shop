/**
 * get Cart Items Count
 * @param items
 * @returns {number}
 */
export const getCartItemsCount = items => {
  let total = 0
  items.forEach(item => {
    total += parseInt(item.quantity)
  });
  return total
}
/**
 * get sum price
 * @param items
 * @returns {*}
 */
export const getCartPriceSum = items =>
  items.reduce((total, item) =>
    total + parseFloat(item.price) * parseInt(item.quantity),
    0
  )

/**
 * get item quantity put in the car
 * @param id
 * @returns {Number}
 */
export const getAddedQuantity =  (id) => {
  try {
    const cart = JSON.parse(localStorage.getItem('CART')) || []
    const found = cart.find(item => item._id === id)
    if (found) {
      return parseInt(found.quantity)
    }
    return 0
  } catch(err){
    return 0
  }
}


