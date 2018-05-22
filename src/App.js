import React, {Component} from 'react'
import {HashRouter as Router, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import Home from "./containers/Home"
import Admin from "./containers/admin/Index"
import Cart from "./containers/Cart"
import Detail from './containers/Detail'
import Loading from './components/common/Loading'
import {getCartItemsCount} from "./utils/getters";

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {status, cartItemsCount} = this.props
    return (
      <Router>
        <div>
          <nav>
            <div className="container">
              <ul className="nav-left">
                <li>
                  <NavLink exact to="/products"><i className="iconfont icon-home"></i> 首页</NavLink>
                </li>
                <li>
                  <NavLink to="/admin"><i className="iconfont icon-admin"></i> 管理</NavLink>
                </li>
              </ul>
              <ul className="nav-right">
                <li>
                  <NavLink to="/cart"><i className="iconfont icon-cart"></i> 购物车 ({cartItemsCount})</NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="main-view">
            <div className={status.code == 1 ? '' : 'hidden'}>
              <Switch>
                <Route exact path="/products" component={Home}></Route>
                <Route path="/admin" component={Admin}/>
                <Route path="/products/:id" component={Detail} />
                <Route path="/cart" component={Cart}/>
                <Redirect to="/products"/>
              </Switch>
            </div>
            {status.code == -1 &&
            <Loading />
            }
          </div>
          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    cartItemsCount: getCartItemsCount(state)
  }
}

export default connect(mapStateToProps)(App)


