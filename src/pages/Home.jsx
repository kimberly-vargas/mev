import React from 'react'
import '../styles/home.css'
import heroImg from '../assets/images/hero-img.png'
import { Helmet } from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Services } from '../services/Services'

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
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam cupiditate doloribus cumque eveniet repellat nobis eum rerum temporibus velit iste, quae dicta inventore vero, sapiente ratione? Ipsum, obcaecati rerum.</p>
                <motion.button whileHover={{scale:1.1}} className="buy__btn">
                  <Link to='/shop'>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' mg='6'>
              <div className="hero__img">
                <img src={heroImg} alt="" className="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services/>
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Trending Products</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export {Home}