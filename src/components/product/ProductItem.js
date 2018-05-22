import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import '../../assets/less/home.less'

import currency from "../../utils/currency";

const ProductItem = ({product, added, addCartItem}) => (
  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="product">
      <Link to={{pathname: `/products/${product._id}`, state: product}} className="product-link">
        <div className="product-image">
          <img className="img-responsive" src={product.image} alt="" />
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
        <button className="button"
          disabled={added >= product.inventory}
          onClick={addCartItem}>加入购物车</button>
      </div>
    </div>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  added: PropTypes.number.isRequired,
  addCartItem: PropTypes.func.isRequired
}

export default ProductItem

