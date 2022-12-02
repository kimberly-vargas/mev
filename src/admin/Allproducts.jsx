import { Container, Row, Col } from "reactstrap"
import { useGetData } from "../custom-hooks/useGetData"
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const {data: productsData, loading} = useGetData('products')
  const navigate = useNavigate();

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, 'products', id))
    toast.success('Deleted succesfully')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div>
            <button className="buy__btn mb-5 mt-2" onClick={() => {navigate("/dashboard/add-products");}}>
              New product
            </button>
            </div>
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <tr><td className="py-4">Loading...</td></tr> :
                  productsData.map(item => 
                    <tr key={item.id}>
                      <td><img src={item.imgUrl} alt="" /></td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {deleteProduct(item.id)}}>
                          <i style={{color: '#fff'}} className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                    )
                }
              </tbody>
            </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export {Allproducts}