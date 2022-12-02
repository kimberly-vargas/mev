import "../styles/productDetails.css";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ProductsList } from '../components/UI/ProductsList'
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config"; 
import { doc, getDoc } from 'firebase/firestore'
import { useGetData } from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const { id } = useParams();
  const {data: products} = useGetData('products')
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({
    imgUrl:'',
    productName: '',
    price: 0,
    avgRating: 0,
    reviews: [],
    description: '',
    shortDesc: '',
    category: ''
  })
  const relatedProducts = products.filter(item => item.category === product.category)
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }
    toast.success('Thanks for letting a review!')
    setProduct({...product, reviews: [...product.reviews, reviewObj]})
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: product.imgUrl,
      productName: product.productName,
      price: product.price
    }))
    toast.success('Product added successfully')
  }

  useEffect(() => {
    const docRef = doc(db, 'products', id)
    const getProduct = async() => {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()){
        setProduct(docSnap.data())
      } else {
        toast.error('no product!')
      }
    }
    getProduct()
  }, [])
  return (
    <Helmet title={product.productName}>
      <CommonSection title={product.productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={product.imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{product.productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className={product.avgRating >= 1 ? "ri-star-fill" : product.avgRating > 0 ? "ri-star-half-fill" : "ri-star-line"}></i>
                    </span>
                    <span>
                      <i className={product.avgRating >= 2 ? "ri-star-fill" : product.avgRating > 1 ? "ri-star-half-fill" : "ri-star-line"}></i>
                    </span>
                    <span>
                      <i className={product.avgRating >= 3 ? "ri-star-fill" : product.avgRating > 2 ? "ri-star-half-fill" : "ri-star-line"}></i>
                    </span>
                    <span>
                      <i className={product.avgRating >= 4 ? "ri-star-fill" : product.avgRating > 3 ? "ri-star-half-fill" : "ri-star-line"}></i>
                    </span>
                    <span>
                      <i className={product.avgRating === 5 ? "ri-star-fill" : product.avgRating > 4 ? "ri-star-half-fill" : "ri-star-line"}></i>
                    </span>
                  </div>
                  <p>
                    (<span>{product.avgRating}</span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${product.price}</span>
                  <span>Category: {product.category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{product.shortDesc}</p>
                <motion.button whileHover={{ scale: 1.1 }} className="buy__btn" onClick={addToCart}>
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({product.reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper mt-5">
                    <ul>
                      {product.reviews?.map((item, index) => (
                        <li key={index} className={"mb-4"}>
                          <h6>{item.userName}</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter name" ref={reviewUser} required/>
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(1)}>1
                            <i className={rating >=1 ? "ri-star-fill" : "ri-star-line"}></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(2)}>2
                            <i className={rating >=2 ? "ri-star-fill" : "ri-star-line"}></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(3)}>3
                            <i className={rating >=3 ? "ri-star-fill" : "ri-star-line"}></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(4)}>4
                            <i className={rating >=4 ? "ri-star-fill" : "ri-star-line"}></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(5)}>5
                            <i className={rating >=5 ? "ri-star-fill" : "ri-star-line"}></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea rows={4} type="text" placeholder="Review message..." ref={reviewMsg} required/>
                        </div>
                        <button type='submit' className="buy__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg='12' className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { ProductDetails };