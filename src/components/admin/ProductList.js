import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { getAllProducts, removeProduct } from '../../actions/products'

class ProductList extends Component {

  constructor(props) {
    super(props)
    props.getAllProducts()
  }

  deleteProduct(id) {
    toastr.confirm('确定要删除该产品？', {
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.removeProduct(id)
        toastr.warning('删除产品成功！')
      }
    })
  }

  render() {
    const { products, match } = this.props
    return (
      <div className="admin-products col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <table className="table table-striped">
          <thead>
          <tr>
            {products.length > 0 ?
              <React.Fragment>
                <th>商品名</th>
                <th>价格</th>
                <th>库存</th>
                <th>品牌</th>
              </React.Fragment>
              :
              <th colSpan="4">产品列表为空</th>
            }
            <th colSpan="2">
              <Link to={`${match.path}/new`}>添加</Link>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            products.map((item) =>
              <tr key={item._id}>
                <td className="name">{item.name}</td>
                <td className="price">{item.price}</td>
                <td className="inventory">{item.inventory}</td>
                <td className="manufacturer">{item.manufacturer.name}</td>
                <td>
                  <Link title="编辑" to={{ pathname: `${match.path}/edit/${item._id}`, state: item }}>
                    <i className="iconfont icon-edit"></i>
                  </Link>
                </td>
                <td>
                  <i className="iconfont icon-delete" title="删除" onClick={() => this.deleteProduct(item._id)}></i>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(connect(state => state,
  { getAllProducts, removeProduct })(ProductList))
