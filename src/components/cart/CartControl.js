import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateCartItem, willUpdateItem } from '../../actions/cart'
import '../../assets/less/cart-control.less'

class CartControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.product.quantity || 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  static propTypes = {
    product: PropTypes.object.isRequired,
    added: PropTypes.number.isRequired,
    needConfirmed: PropTypes.bool
  }

  increment(e) {
    e.preventDefault()
    const { product, needConfirmed, added } = this.props
    let count = this.state.count;
    let max = count
    if (needConfirmed) {
      max = this.state.count + added;
    }
    if (max < product.inventory) {
      this.setState({ count: ++count });
      this.watchCount(count)
    }
  }

  decrement(e) {
    e.preventDefault()
    let count = this.state.count;
    if (count > 1) {
      this.setState({ count: --count });
      this.watchCount(count)
    }
  }

  handleChange(e) {
    let val = e.target.value
    // Should be a positive integer
    if (/^[1-9]\d*$/.test(val) && val <= this.props.product.inventory) {
      this.setState({ count: parseInt(val) })
      this.watchCount(val)
    } else {
      e.target.value = this.state.count
    }
  }

  watchCount(count) {
    const { product, needConfirmed, willUpdateItem, updateCartItem } = this.props
    if (needConfirmed) {
      willUpdateItem(count)
    } else {
      updateCartItem({
        id: product._id,
        count
      })
    }
  }

  render() {
    return (
      <div className="cart-control">
        <div className="cart-decrease" title="减"
          onClick={this.decrement}>
          <span className="iconfont icon-remove-circle"></span>
        </div>
        <input className="cart-count" value={this.state.count}
          onChange={this.handleChange} />
        <div className="cart-add" title="加" onClick={this.increment}>
          <span className="iconfont icon-add-circle"></span>
        </div>
      </div>
    )
  }
}

export default connect(state => state.cart, { willUpdateItem, updateCartItem })(CartControl)
