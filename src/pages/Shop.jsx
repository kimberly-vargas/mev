import '../styles/shop.css'
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState, useRef } from 'react';
import { ProductsList } from '../components/UI/ProductsList'
import { useGetData } from "../custom-hooks/useGetData";

const Shop = () => {
  const {data: products} = useGetData('products')
  const [productsData, setProductsData] = useState([])
  const sortBox = useRef('')
  
  const handleFilter = ({target}) => {
    if (target.value === 'all'){
      setProductsData(products)
    } else {
      const filteredProducts = products.filter(item => item.category === target.value)
      setProductsData(filteredProducts)
    }
    sortBox.current.value = 'default'
  }
  
  const handleSearch = ({target}) => {
    const searchedProducts = products.filter(item => item.productName.toLocaleLowerCase().includes(target.value))
    setProductsData(searchedProducts)
  }
  const handleSort = ({target}) => {
    if (target.value === 'lowset price'){
      const sortedProducts = [...productsData].sort((a, b) => {
        return Number(a.price) - Number(b.price)
      })
      setProductsData(sortedProducts)
    } else if (target.value === 'highest price') {
      const sortedProducts = [...productsData].sort((a, b) => {
        return Number(b.price) - Number(a.price)
      })
      setProductsData(sortedProducts)
    }
  }

  useEffect(() => {
    setProductsData(products)
  }, [products])

  
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" className='filter__column'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Category</option>
                  <option value="all">All</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className='filter__column text-end'>
              <div className="filter__widget">
                <select onChange={handleSort} ref={sortBox}>
                  <option value='default'>Sort By</option>
                  <option value="highest price">Highest price</option>
                  <option value="lowset price">Lowset price</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input type="text" placeholder="Search..." onChange={handleSearch}/>
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className='pt-0'>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'>No products were found!</h1> : <ProductsList data={productsData}/>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { Shop };
