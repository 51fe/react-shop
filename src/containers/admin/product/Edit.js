import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import ProductForm from '../../../components/product/ProductForm'
import {getProductById, updateProduct} from '../../../actions/product'
import {getAllManufacturers} from '../../../actions/manufacturer'

class EditProduct extends Component {

  constructor(props) {
    super(props)
    if(!props.location.state) {
      props.getProductById(props.match.params.id)
    }
    if (props.manufacturers.length == 0) {
      props.getAllManufacturers()
    }
  }

  render() {
    const {product, manufacturers, match, location, updateProduct} = this.props;

    let item = product
    if(location.state) {
      item = location.state.item
    }
    return (
      <ProductForm
        model={item}
        manufacturers={manufacturers}
        saveProduct={updateProduct}
        isEditing={true}>
      </ProductForm>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.item,
    manufacturers: state.manufacturer.items,
  }
}

export default withRouter(connect(mapStateToProps,
  {getProductById, updateProduct, getAllManufacturers})(EditProduct))


