import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import "../styles/orders.css";

const Orders = () => {
  const { data: orders, loading } = useGetData("orders");

  const handleComplete = async(id, status) => {
    const docRef = doc(db, 'orders', id)
    await updateDoc(docRef, {completed: !status});
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Billing Information</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="py-4">Loading...</td>
                    </tr>
                  ) : (
                    orders.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>
                          <ul className="orders__billing-list">
                            <li>
                              <div>Order:</div> {item.id}
                            </li>
                            <li>
                              <div>Name:</div> {item.billingInformation.name}
                            </li>
                            <li>
                              <div>Email:</div> {item.billingInformation.email}
                            </li>
                            <li>
                              <div>Phone Number:</div>{" "}
                              {item.billingInformation.phoneNumber}
                            </li>
                            <li>
                              <div>Country:</div>{" "}
                              {item.billingInformation.country}
                            </li>
                            <li>
                              <div>City:</div> {item.billingInformation.city}
                            </li>
                            <li>
                              <div>Zip Code:</div>{" "}
                              {item.billingInformation.zipCode}
                            </li>
                            <li>
                              <div>Street address:</div>{" "}
                              {item.billingInformation.streetAddress}
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>{item.productName}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>{item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>${item.totalPrice}</li>
                            ))}
                          </ul>
                        </td>
                        <td>${item.cart.totalAmount}</td>
                        <td>
                          <button
                            className={`btn btn-${
                              item.completed ? "primary" : "danger"
                            }`}
                            onClick={() => {
                              handleComplete(item.id, item.completed);
                            }}
                          >
                            {item.completed ? "completed" : "incompleted"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { Orders };
