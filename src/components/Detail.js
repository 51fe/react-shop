import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductById } from '../actions/product'
import { addCartItems, willUpdateItem } from '../actions/cart'
import currency from '../utils/currency'
import { getAddedQuantity } from '../utils'
import CartControl from './CartControl'

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    // reset count state
    props.willUpdateItem(1)
    // console.log(props.match.params.id)
    props.getProductById(props.match.params.id)
  }

  handleAddItems(product) {
    const { history, addCartItems } = this.props
    addCartItems(product)
    history.push('/cart')
  }

  render() {
    const { product, code } = this.props
    const added = getAddedQuantity(product._id)
    const disabled = added >= product.inventory
    return (
      code === 1 && <div className="container product-details">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <img className="img-responsive" src={product.image} alt="" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12">
          <div className="product-details-description">
            <small>{product.manufacturer && product.manufacturer.name}</small>
            <h4>{product.name}</h4>
            <h5>{disabled ? '缺货' : (product.inventory - added) + '件可售'}</h5>
            <hr />
            <div>
              {product.description}
            </div>
          </div>
          <hr />
          <div className="product-details-price-cart">
            <div>{currency(product.price)}</div>
            <CartControl
              product={product}
              added={added}
              needConfirmed={true}
            />
            <button
              className="button"
              disabled={disabled}
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
    product: state.product,
    code: state.status.code
  }
}

export default connect(mapStateToProps, { getProductById, addCartItems, willUpdateItem })(ProductDetail)



