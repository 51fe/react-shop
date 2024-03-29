import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import { getAllManufacturers, removeManufacturer } from '../../actions/manufacturers'

class ManufacturerList extends Component {

  constructor(props) {
    super(props)
    props.getAllManufacturers()
  }

  deleteManufacturer(id) {
    toastr.confirm('确定要删除该品牌？', {
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.removeManufacturer(id)
        toastr.success('删除品牌成功！')
      }
    })
  }

  render() {
    const { manufacturers, match } = this.props
    return (

      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 admin-manufacturers">
        <table className="table table-striped">
          <thead>
          <tr>
            <th>{manufacturers.length > 0 ? '品牌名' : '品牌列表为空'}</th>
            <th colSpan="2">
              <Link to={`${match.path}/new`}>添加</Link>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            manufacturers.map((item) =>
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <Link title="编辑" to={{ pathname: `${match.path}/edit/${item._id}`, state: item }}>
                    <i className="iconfont icon-edit"></i>
                  </Link>
                </td>
                <td>
                  <a href="void;" title="删除" onClick={() => this.deleteManufacturer(item._id)}>
                    <i className="iconfont icon-delete"></i>
                  </a>
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
  { getAllManufacturers, removeManufacturer })(ManufacturerList))

