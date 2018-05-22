import React, {Component} from 'react'
import {NavLink, Redirect, Route, withRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Products from './product/Products'
import Manufacturers from './manufacturer/Manufacturers'
import NewManufacturer from './manufacturer/New'
import EditManufacturer from './manufacturer/Edit'
import NewProduct from './product/New'
import EditProduct from './product/Edit'

import '../../assets/less/admin.less'

class Index extends Component {

  render() {
    const {items, match} = this.props;
    return (
      <div className="container admin">
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <ul className="admin-menu">
            <li>
              <NavLink to={`${match.path}/manufacturers`}>品牌列表</NavLink>
            </li>
            {items.length > 0 &&
            <li>
              <NavLink to={`${match.path}/products`}>商品列表</NavLink>
            </li>
            }
          </ul>
        </div>
        <Switch>
          <Route exact path={`${match.path}/manufacturers`} component={Manufacturers} />
          <Route exact path={`${match.path}/products`} component={Products} />
          <Route path={`${match.path}/manufacturers/new`} component={NewManufacturer} />
          <Route path={`${match.path}/manufacturers/edit/:id`} component={EditManufacturer} />
          <Route path={`${match.path}/products/new`} component={NewProduct} />
          <Route path={`${match.path}/products/edit/:id`} component={EditProduct} />
          <Redirect to={`${match.path}/manufacturers`} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(state => state.manufacturer)(Index))


