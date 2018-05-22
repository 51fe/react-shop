// 计数器
import React, {Component, Fragment} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getAllProducts} from '../actions/product'
import ProductList from "../components/product/ProductList"
import '../assets/less/home.less'

class Home extends Component {
  constructor(props) {
    super(props)
    props.getAllProducts()
  }

  render() {
    const {items} = this.props
    return (
      <Fragment>
        <div className="title">
          <h4>
            {items.length > 0 ?
              <div className="iconfont icon-sale">
                热卖中...</div>
              :
              <div>
                产品还没上架，请在管理页面<NavLink to="/admin"> 添加</NavLink>
              </div>
            }
          </h4>
        </div>
        <ProductList products={items}></ProductList>
      </Fragment>
    )
  }
}

export default withRouter(connect(state => state.product, {getAllProducts})(Home))
