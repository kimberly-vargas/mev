import '../styles/cart.css'
import { Helmet } from '../components/Helmet/Helmet'
import { CommonSection } from '../components/UI/CommonSection'
import { Container, Col, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const dispatch = useDispatch()
  const deleteProduct = (item) => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart'/>
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? <h2 className='fs-4 text-center'>No items in the cart</h2> :
                <table className='table bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems.map((item, index) => 
                    <tr key={index}>
                      <td><img src={item.imgUrl} alt="" /></td>
                      <td>{item.productName}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td><motion.i whileTap={{scale: 1.2}} className="ri-delete-bin-line" onClick={() => deleteProduct(item)}></motion.i></td>
                    </tr>
                    )
                  }
                </tbody>
              </table>
              }
            </Col>
            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>SubTotal
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>taxes and shipping will be calculated in the checkout</p>
              <div>
              <button className="buy__btn w-100"><Link to='/checkout'>Checkout</Link></button>
                <button className="buy__btn w-100 mt-3"><Link to='/shop'>Continue Shopping</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export {Cart}