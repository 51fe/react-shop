// 计数器
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCartItem } from '../actions/cart'
import ProductItem from './ProductItem'
import { getAllProducts } from '../actions/products'
import '../styles/home.less'

class Home extends Component {
  constructor(props) {
    super(props)
    props.getAllProducts()
  }

  render() {
    const { products, code, addCartItem } = this.props
    return (
      code === 1 && <>
        <div className="title">
          <h4>
            {products.length === 0 ?
              <div>
                产品还没上架，请在管理页面<NavLink to="/admin"> 添加</NavLink>
              </div>
              :
              <div className="iconfont icon-sale">热卖中...</div>
            }
          </h4>
        </div>
        <div className="products">
          <div className="container">
            {
              products.map(item =>
                <ProductItem
                  product={item}
                  key={item._id}
                  addCartItem={() => addCartItem(item)}
                />
              )
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    code: state.status.code,
  }
}

export default connect(mapStateToProps, { getAllProducts, addCartItem })(Home)
