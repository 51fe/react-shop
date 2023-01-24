import React from 'react'
import { connect } from 'react-redux'
import { validate, validateAll } from '../../utils/validate'
import { toastr } from 'react-redux-toastr'
import ButtonGroup from '../ButtonGroup'
import { addProduct, updateProduct } from '../../actions/products'
import { getAllManufacturers } from '../../actions/manufacturers'

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...{
        name: '',
        manufacturer: '',
        price: '',
        inventory: '',
        image: '',
        description: ''
      },
      ...props.model
    }
    this.validate = validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    props.getAllManufacturers();
    // reset manufacturer due to select value doesn't support object
    const { isEditing, model } = props;
    if (isEditing && model.manufacturer) {
      this.setState({ manufacturer: model.manufacturer._id })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { model } = this.props;
    if (prevProps.model.name !== model.name) {
      for (let key in model) {
        this.setState({ [key]: model[key] });
      }
      this.setState({ manufacturer: model.manufacturer._id });
    } else if (prevProps.manufacturers.length > 0 && prevState.manufacturer === '') {
      this.setState({ manufacturer: this.props.manufacturers[0]._id });
    }
  }

  handleSubmit(event) {
    const { model, isEditing, addProduct, updateProduct } = this.props;
    event.preventDefault();
    if (validateAll(event)) {
      if (isEditing) {
        updateProduct({
          _id: model._id,
          ...this.state
        }).then(() => {
          toastr.success('消息', '修改产品成功！');
          window.history.back()
        })
      } else {
        addProduct(this.state).then(() => {
          toastr.success('消息', '新增产品成功！');
          window.history.back()
        })
      }
    } else {
      toastr.error('消息', '请确保表单填写正确');
    }
  }

  handleChange(event) {
    this.setState({ manufacturer: event.target.value });
  }

  goBack() {
    window.history.back()
  }

  render() {
    const { isEditing, manufacturers } = this.props;
    const {
      name_$error_required, price_$error_pattern,
      inventory_$error_pattern, image_$error_pattern, description_$error_pattern
    } = this.state;

    const listItems = manufacturers.map(m => {
      return (
        <option value={m._id} key={m._id}>
          {m.name}
        </option>
      )
    });

    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
          <div className="form-group">
            <label htmlFor="name">产品名</label>
            <input name="name" required
              placeholder="产品名" className="form-control"
              value={this.state.name} onChange={this.validate} onBlur={this.validate} />
            {name_$error_required &&
              <span className="small text-danger">产品名不能为空</span>
            }
          </div>

          <div className="form-group">
            <label htmlFor="price">价格</label>
            <input name="price" required pattern="(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)"
              placeholder="价格" className="form-control"
              value={this.state.price} onChange={this.validate} onBlur={this.validate} />
            {price_$error_pattern &&
              <span className="small text-danger">价格不能为空且最多两位小数</span>
            }
          </div>
          <div className="form-group">
            <label htmlFor="inventory">库存</label>
            <input type="number" name="inventory" required
              placeholder="库存" className="form-control" pattern="^\d+"
              value={this.state.inventory} onChange={this.validate} onBlur={this.validate} />
            {inventory_$error_pattern &&
              <span className="small text-danger">库存不能为空且有效</span>
            }
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div className="form-group">
            <label htmlFor="manufacturer">品牌</label>
            <select name="manufacturer" className="form-control"
              value={this.state.manufacturer} onChange={this.handleChange}>
              {listItems}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">图片</label>
            <input name="image" pattern="^https?\:\/\/\S+"
              placeholder="图片" className="form-control"
              value={this.state.image} onChange={this.validate} onBlur={this.validate} />
            {image_$error_pattern &&
              <span className="small text-danger">图片不能为空且有效</span>
            }
          </div>
          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea name="description" pattern="\S{10,}"
              placeholder="描述" className="form-control" rows="5"
              value={this.state.description} onChange={this.validate} onBlur={this.validate} />
            {description_$error_pattern &&
              <span className="small text-danger">描述不能为空且字数不能少于10</span>
            }
          </div>
          <ButtonGroup isEditing={isEditing} />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const isEditing = ownProps.location.state !== undefined;
  return {
    manufacturers: state.manufacturers,
    model: isEditing ? ownProps.location.state : { name: '' },
    isEditing
  };
}

export default connect(mapStateToProps,
  { getAllManufacturers, addProduct, updateProduct })(ProductForm);
