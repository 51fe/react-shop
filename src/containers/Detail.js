import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getProductById} from '../actions/product'
import {addCartItems, willUpdateItem} from '../actions/cart'

import ProductDetail from '../components/product/ProductDetail'

class Detail extends Component {

  constructor(props) {
    super(props)
    // reset count state
    props.willUpdateItem(1)
    if (!props.location.state) {
      props.getProductById(props.match.params.id)
    }
  }

  render() {
    const {item, location} = this.props
    const model = {...item, ...location.state}
    return (
      <ProductDetail product={model}></ProductDetail>
    )
  }
}

export default withRouter(connect(state => state.product,
  {getProductById, willUpdateItem}
)(Detail))




