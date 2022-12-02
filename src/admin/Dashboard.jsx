import { Container, Row, Col } from "reactstrap"
import { useGetData } from '../custom-hooks/useGetData'
import '../styles/dashboard.css'

const Dashboard = () => {
  const {data: products} = useGetData('products')
  const {data: orders} = useGetData('orders')

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col className="lg-3 dashboard__box">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>${orders.reduce((total, item) => total + item.cart.totalAmount, 0)}</span>
            </div>
          </Col>
          <Col className="lg-3 dashboard__box">
            <div className="orders__box">
              <h5>Orders</h5>
              <span>{orders.length}</span>
            </div>
          </Col>
          <Col className="lg-3 dashboard__box">
            <div className="products__box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export {Dashboard}