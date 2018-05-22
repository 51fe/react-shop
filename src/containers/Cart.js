import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'

import currency from '../utils/currency'
import CartItem from '../components/cart/CartItem'
import {getAddedQuantity, getCartItemsCount, getCartPriceSum} from '../utils/getters';
import {removeCartItem} from '../actions/cart';
import {endLoad} from '../actions/status';

import '../assets/less/cart.less'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.goPay = this.goPay.bind(this)
    // no need load
    props.endLoad()
  }

  goPay() {
    toastr.confirm('功能有待添加', {
      okText: '确认',
      disableCancel: true,
    })
  }

  render() {
    const {cart, cartItemsCount, priceSum, removeCartItem} = this.props
    return (
      <div className="wrap">
        <div className="cart-wrap">
          <div className="title">
            <h4>
              <i className="iconfont icon-superpowers"></i>
              {cartItemsCount > 0 ? '您的购物车' : '购物车是空的'}
            </h4>
          </div>
          {
            cart.map(p =>
              <CartItem product={p} key={p._id}
                added={getAddedQuantity(cart, p._id)}
                removeCartItem={() => removeCartItem(p)}>
              </CartItem>)
          }
        </div>

        <div className="cart-floatbar">
          {cartItemsCount > 0 &&
          <div className="toolbar-wrap">
            <div className="amount-sum">
              <em>{cartItemsCount}</em>件商品
            </div>
            <div className="price-sum">
              总价：<em>{currency(priceSum)}</em>
            </div>
            <button className="button go-pay-button" onClick={this.goPay}> 去结算</button>
          </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.cart,
    cart: state.cart.items,
    cartItemsCount: getCartItemsCount(state),
    priceSum: getCartPriceSum(state)
  }
}

export default withRouter(connect(mapStateToProps, {removeCartItem, endLoad})(Cart))
