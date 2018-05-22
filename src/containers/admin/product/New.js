import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import ProductForm from '../../../components/product/ProductForm'
import {getAllManufacturers} from '../../../actions/manufacturer'
import {addProduct} from '../../../actions/product'

class NewProduct extends Component {
  constructor(props) {
    super(props)
    props.getAllManufacturers()
  }
  render() {
    const {manufacturers, addProduct} = this.props;
    return (
      <ProductForm
        model={{}}
        manufacturers={manufacturers}
        saveProduct={addProduct} />
    )
  }
}

const mapStateToProps = state => {
  return {
    toastr: state.toastr,
    product: state.product.item,
    manufacturers: state.manufacturer.items
  }
}

export default withRouter(connect(mapStateToProps, {getAllManufacturers, addProduct})(NewProduct))
