import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ProductItem from './ProductItem'
import {addCartItem} from '../../actions/cart'
import {getAddedQuantity} from '../../utils/getters'

class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired
  }

  render() {
    const {products, cart, addCartItem} = this.props
    return (
      <div className="products">
        <div className="container">
          {
            products.map((p) =>
              <ProductItem product={p} key={p._id}
                added={getAddedQuantity(cart, p._id)}
                addCartItem={() => addCartItem(p)} />
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.items
  }
}
export default withRouter(connect(mapStateToProps, {addCartItem})(ProductList))
