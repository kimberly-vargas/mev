import React from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'

const Home = () => {
  const year = new Date().getFullYear()

  return (
    <Helmet title={'Home'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' mg='6'>
              <div className="hero__content">
                <p className="hero__subtitle"> Trending products in {year}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export {Home}