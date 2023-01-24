import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import CartControl from './CartControl'
import currency from '../utils/currency'

const CartItem = ({ product, removeCartItem }) => (
  <div className="container product-details">
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <Link to={`/products/${product._id}`}>
        <img className="img-responsive" src={product.image} alt="" />
      </Link>
    </div>
    <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12">
      <div className="product-details-description">
        <h4>{product.name}</h4>
      </div>
      <div className="product-details-price-cart">
        <div>{currency(product.price)}</div>
        <CartControl product={product}></CartControl>
        <div>{currency(product.price * product.quantity)}</div>
        <span className="iconfont icon-delete" title="移除" onClick={removeCartItem}></span>
      </div>
    </div>
  </div>
)

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  added: PropTypes.number,
  removeCartItem: PropTypes.func.isRequired
}

export default CartItem

