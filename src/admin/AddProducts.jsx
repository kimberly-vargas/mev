import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    shortDesc: "",
    description: "",
    category: "chair",
    price: 0,
    imgUrl: null,
    reviews: [],
    avgRating: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const productObj = { ...product, [target.name]: target.value };
    setProduct(productObj);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    //add product to firebase database
    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + product.imgUrl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, product.imgUrl);
      uploadTask.on(
        () => {
          toast.error("Image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, { ...product, imgUrl: downloadURL });
          });
        }
      );
      setLoading(false);
      toast.success("Product added succesfuly");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("Product not added");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                <h4 className="mb-4">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product name</span>
                    <input
                      type="text"
                      name="productName"
                      required
                      placeholder="Double Sofa"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      name="shortDesc"
                      required
                      placeholder="Double sofa for livingroom..."
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      name="description"
                      required
                      placeholder="Beatiful and comfy sofa with..."
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="text"
                        name="price"
                        required
                        placeholder="$299"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        name="category"
                        className="w-100 p-2"
                        onChange={handleChange}
                      >
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form__group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        name="imgUrl"
                        required
                        onChange={({ target }) =>
                          setProduct({ ...product, imgUrl: target.files[0] })
                        }
                      />
                    </FormGroup>
                  </div>
                  <button type="submit" className="buy__btn">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { AddProducts };
