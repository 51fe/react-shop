import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import axois from "../actions/request"
import currency from '../utils/currency'
import CartItem from './CartItem'
import { getCartItemsCount, getCartPriceSum } from '../utils'
import { removeCartItem } from '../actions/cart'
import { endLoad } from '../actions/status'

import '../styles/cart.less'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.goPay = this.goPay.bind(this)
    // no need load
    props.endLoad()
  }

  goPay() {
    const { items, removeCartItem } = this.props
    items.forEach(async item => {
      await axois.put(`products/${item._id}`, {
        ...item,
        inventory: item.inventory - item.quantity
      })
      removeCartItem(item)
    })
    toastr.confirm('功能有待添加', {
      okText: '确认',
      disableCancel: true,
    })
  }

  render() {
    const { items, removeCartItem } = this.props
    const cartItemsCount = getCartItemsCount(items)
    return (
      <div className="wrap">
        <div className="cart-wrap">
          <div className="title">
            <h4>
              <i className="iconfont icon-superpowers"></i>
              {cartItemsCount > 0 ? ' 您的购物车' : ' 购物车是空的'}
            </h4>
          </div>
          {
            items.map(item =>
              <CartItem
                product={item}
                key={item._id}
                removeCartItem={() => removeCartItem(item)}
              />
            )
          }
        </div>

        <div className="cart-floatbar">
          {cartItemsCount > 0 &&
          <div className="toolbar-wrap">
            <div className="amount-sum">
              <em>{cartItemsCount}</em>件商品
            </div>
            <div className="price-sum">
              总价：<em>{currency(getCartPriceSum(items))}</em>
            </div>
            <button className="button go-pay-button" onClick={this.goPay}>去结算</button>
          </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.items
  }
}

export default withRouter(connect(mapStateToProps, { removeCartItem, endLoad })(Cart))
