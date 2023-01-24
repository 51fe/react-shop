import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { addManufacturer, updateManufacturer } from '../../actions/manufacturers'
import { validate, validateAll } from '../../utils/validate'
import ButtonGroup from '../ButtonGroup'

class ManufacturerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.model.name };
    this.validate = validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { model, isEditing, history, addManufacturer, updateManufacturer } = this.props;
    if (validateAll(event)) {
      if (isEditing) {
        updateManufacturer({
          ...model,
          ...this.state
        }).then(() => {
          toastr.success('消息', '修改产品成功！');
          history.goBack();
        })
      } else {
        addManufacturer(this.state).then(() => {
          toastr.success('消息', '新增产品成功！');
          history.goBack();
        })
      }

    } else {
      toastr.error('消息', '请确保表单填写正确');
    }
  }

  render() {
    const { isEditing } = this.props;
    const { name_$error_required } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
          <div className="form-group">
            <label htmlFor="name">品牌名</label>
            <input name="name" required
              placeholder="品牌名" className="form-control"
              value={this.state.name} onChange={this.validate} onBlur={this.validate} />
            {name_$error_required &&
              <span className="small text-danger">品牌名不能为空</span>
            }
          </div>
          <ButtonGroup isEditing={isEditing} />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const isEditing = ownProps.location.state !== undefined
  return {
    model: isEditing ? ownProps.location.state : { name: '' },
    isEditing
  };
}

export default connect(mapStateToProps, { addManufacturer, updateManufacturer })(ManufacturerForm);
