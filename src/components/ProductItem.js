import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getAddedQuantity } from '../utils'
import currency from "../utils/currency"

import '../styles/home.less'

class ProductItem extends Component {
  render() {
    const { product, addCartItem } = this.props
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 product-item">
        <Link to={`/products/${product._id}`} className="product-link">
          <div className="product-image">
            <img className="img-responsive" src={product.image} alt=""/>
          </div>
          <div className="product-description">
            <div className="product-info">
              <small>{product.manufacturer.name}</small>
              <h4>{product.name}</h4>
            </div>
            <div className="product-price-cart">
              {currency(product.price)}
            </div>
          </div>
        </Link>
        <div className="product-action">
          <button
            className="button"
            disabled={getAddedQuantity(product._id) >= product.inventory}
            onClick={addCartItem}
          >
            加入购物车
          </button>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  addCartItem: PropTypes.func.isRequired
}

export default ProductItem
