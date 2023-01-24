import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

import Products from './ProductList'
import Manufacturers from './ManufacturerList'
import ManufacturerForm from './ManufacturerForm'
import ProductForm from './ProductForm'

import '../../styles/admin.less'

class Admin extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="container admin">
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <ul className="admin-menu">
            <li>
              <NavLink to={`${match.path}/manufacturers`}>品牌列表</NavLink>
            </li>
            <li>
              <NavLink to={`${match.path}/products`}>商品列表</NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={`${match.path}/manufacturers`} component={Manufacturers} />
          <Route exact path={`${match.path}/products`} component={Products} />
          <Route path={`${match.path}/manufacturers/new`} component={ManufacturerForm} />
          <Route path={`${match.path}/manufacturers/edit/:id`} component={ManufacturerForm} />
          <Route path={`${match.path}/products/new`} component={ProductForm} />
          <Route path={`${match.path}/products/edit/:id`} component={ProductForm} />
          <Redirect to={`${match.path}/manufacturers`} />
        </Switch>
      </div>
    )
  }
}

export default Admin


