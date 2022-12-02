import "../styles/checkout.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import sinpeLogo from '../assets/images/sinpe-logo.png'
import bacLogo from '../assets/images/bac-bank-transfer.png'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState()
  const [billingInfo, setBilllingInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    zipCode: "",
    streetAddress: "",
  });

  const handleChange = ({ target }) => {
    const billingObj = { ...billingInfo, [target.name]: target.value };
    setBilllingInfo(billingObj);
  };

  const handleOrder = async () => {
    if (
      billingInfo.name &&
      billingInfo.email &&
      billingInfo.phoneNumber &&
      billingInfo.country &&
      billingInfo.city &&
      billingInfo.zipCode &&
      billingInfo.streetAddress &&
      paymentMethod
    ) {
      if (totalQty === 0) {
        toast.warning("There are no products in your cart");
      } else {
        const docRef = await collection(db, "orders");
        const today = new Date().toDateString();
        await addDoc(docRef, {
          date: today,
          billingInformation: billingInfo,
          cart: { items: cartItems, totalAmount: totalAmount },
          completed: false,
        });
        cartItems.map((item) => {
          dispatch(cartActions.deleteItem(item.id));
        });
        navigate(`/payment/${paymentMethod}`);
      }
    } else {
      toast.warning("Fill all the information!");
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your Country"
                    name="country"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your City"
                    name="city"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Enter your Zip code"
                    name="zipCode"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your Street address"
                    name="streetAddress"
                    onChange={handleChange}
                  />
                </FormGroup>
                <h6 className="mb-4 fw-bold mt-5">Choose your payment method</h6>
                <FormGroup className="w-100 payment__method" style={{background: paymentMethod === 'SINPE Movil' ? '#d6e5fb' : ''}} onClick={() => setPaymentMethod('SINPE Movil')}>
                  <div className="d-flex gap-3">
                    <img src={sinpeLogo} alt="" />
                    <h6>SINPE</h6>
                  </div>
                </FormGroup>
                <FormGroup className="w-100 payment__method" style={{background: paymentMethod === 'Bank Transfer' ? '#d6e5fb' : ''}} onClick={() => setPaymentMethod('Bank Transfer')}>
                  <div className="d-flex gap-3" >
                    <img src={bacLogo} alt="" />
                    <h6>Bank Transfer</h6>
                  </div>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty:{" "}
                  <span>
                    {totalQty} {totalQty > 1 ? "items" : "item"}
                  </span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <button
                  className="buy__btn auth__btn w-100"
                  onClick={handleOrder}
                >
                  Place Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { Checkout };
