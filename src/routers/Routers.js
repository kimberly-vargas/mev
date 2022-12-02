import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Cart } from '../pages/Cart'
import { Checkout } from '../pages/Checkout'
import { Login } from '../pages/Login'
import { ProductDetails } from '../pages/ProductDetails'
import { Shop } from '../pages/Shop'
import { Signup } from '../pages/Signup'
import { AddProducts } from '../admin/AddProducts'
import { Allproducts } from '../admin/Allproducts'
import { Dashboard } from '../admin/Dashboard'
import { Orders } from '../admin/Orders'
import { BannerConfig } from '../admin/BannerConfig'
import { Payment } from '../pages/Payment'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='home'/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='payment/:id' element={<Payment/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='shop/:id' element={<ProductDetails/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='signup' element={<Signup/>}/>

      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='dashboard/all-products' element={<Allproducts/>}/>
      <Route path='dashboard/add-products' element={<AddProducts/>}/>
      <Route path='dashboard/orders' element={<Orders/>}/>
      <Route path='dashboard/banner' element={<BannerConfig/>}/>
    </Routes>
  )
}

export {Routers}