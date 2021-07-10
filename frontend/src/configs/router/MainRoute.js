import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import Home from '../../pages/Main/Home'
import Product from '../../pages/Main/Product'
import ProductDetail from '../../pages/Main/ProductDetail'
import NewProduct from '../../pages/Main/NewProduct'

function MainRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/newproduct" component={NewProduct} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/" component={Product} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MainRoute
