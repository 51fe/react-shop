import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import CartControl from '../cart/CartControl'
import currency from '../../utils/currency'
import {addCartItems} from '../../actions/cart'
import {getAddedQuantity} from '../../utils/getters'

class ProductDetail extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  handleAddItems(product) {
    const {history, addCartItems} = this.props
    addCartItems(product)
    history.push('/cart')
  }

  render() {
    const {product, cart, added, count} = this.props
    return (
      <div className="container product-details">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 product-details-image">
          <img className="img-responsive" src={product.image} alt="" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12 product-details__info">
          <div className="product-details-description">
            <small>{product.manufacturer && product.manufacturer.name}</small>
            <h4>{product.name}</h4>
            <h5>{product.inventory > 0 ? product.inventory + '件可售' : '缺货'}</h5>
            <hr />
            <div>
              {product.description}
            </div>
          </div>
          <hr />
          <div className="product-details-price-cart">
            <div>{currency(product.price)}</div>
            <CartControl product={product} added={added} needConfirmed={true}></CartControl>
            <button className="button"
              disabled={added + count > product.inventory}
              onClick={() => this.handleAddItems(product)}>加入购物车
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.cart.count,
    added: getAddedQuantity(state.cart.items, state.product.item._id)
  }
}

export default withRouter(connect(mapStateToProps, {addCartItems})(ProductDetail))
