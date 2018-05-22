import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ManufacturerForm from '../../../components/manufacturer/ManufacturerForm'
import { getManufacturerById, updateManufacturer } from '../../../actions/manufacturer'

class EditManufacturer extends Component {
  constructor(props) {
    super(props)
    if (!props.location.state) {
      props.getManufacturerById(props.match.params.id)
    }
  }

  render() {
    let {item, location, updateManufacturer} = this.props
    return (
      <ManufacturerForm
        model={{...item, ...location.state}}
        saveManufacturer={updateManufacturer}
        isEditing={true}>
      </ManufacturerForm>
    )
  }
}

export default withRouter(connect(state => state.manufacturer,
  { getManufacturerById, updateManufacturer })(EditManufacturer))
