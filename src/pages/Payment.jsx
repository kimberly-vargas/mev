import React from "react";
import { useParams } from "react-router-dom";
import { Container} from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import waLogo from '../assets/images/wa-logo.webp'

const Payment = () => {
  const { id } = useParams();
  let method = "";
  if (id === "SINPE Movil") {
    method = "8414-8249";
  } else if (id === "Bank Transfer") {
    method = "CR 7502 0100 9095 1432 9800";
  }

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container className="d-flex flex-column justify-content-center">
          <h5 className="mb-5 fw-bold" style={{textAlign: 'center'}}>Your order was placed succesfully!</h5>
          <p style={{textAlign: 'center'}}>
            Please make the payment via {id} to <span style={{fontWeight: '500', color: '#000'}}>{method}</span>
          </p>
          <p style={{textAlign: 'center', marginBottom: '100px', marginTop: '10px'}}>
            And send us a screenshot of the receipt
          </p>
          <div className="w-100 d-flex justify-content-center">
            <button className="buy__btn w-100px" onClick={() => window.open("https://api.whatsapp.com/send?phone=84148249&text=Hello, I just placed an order!")}>Let's talk on <span><img style={{width: '28px', marginLeft: '10px'}} src={waLogo} alt="" /></span></button>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export { Payment };
