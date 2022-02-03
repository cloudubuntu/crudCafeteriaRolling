import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateUrl,
  validateCategory,
} from "../../helpers/ValidateFields";

const ProductEdit = ({ URL, getApi }) => {
  //state
  const [product, setProduct] = useState({});
  //Parametros
  const { id } = useParams();
  console.log(`${URL}/${id}`);
  //Referencias
  const productNameRef = useRef("");
  const priceRef = useRef("");
  const urlImgRef = useRef("");
  //Navigate
  const navigate=useNavigate();
  //useEfect
  useEffect(async () => {
    try {
      const res = await fetch(`${URL}/${id}`);
      const productApi = await res.json();
      console.log(productApi);
      setProduct(productApi);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //funcion para actualizar los datos
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productNameRef.current.value);
    //valido los datos igual q en create
    if (
      !validateProductName(productNameRef.current.value) ||
      !validatePrice(priceRef.current.value) ||
      !validateUrl(urlImgRef.current.value) ||
      !validateCategory(product.category)
    ) {
      Swal.fire("OOPS!", "ERROR", "error");
      return;
    }
    console.log("Datos Correctos");
    //Guardar el objeto en db.json
    const productUpdated = {
      productName: productNameRef.current.value,
      price: priceRef.current.value,
      urlImg: urlImgRef.current.value,
      category: product.category,
    };
    //console.log(productUpdated);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,     
      confirmButtonText: 'Update'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try{
          const res=await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productUpdated),
          });
          console.log(res);
          if(res.status===200){
            Swal.fire(
              'updated!',
              'Your file has been updated.',
              'success'
            );
            getApi();
            navigate("/product/table");
          }
        }catch(error){
          console.log(error);
        }
        
      }
    })
  };
  return (
    <div>
      <Container className="py-5">
        <h1>Edit Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              defaultValue={product.productName}
              ref={productNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              defaultValue={product.price}
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product.urlImg}
              ref={urlImgRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            >
              <option value="">Select an option</option>
              <option value="bebida-caliente">Bebida Caliente</option>
              <option value="bebida-fria">Bebida Fria</option>
              <option value="sandwitch">Sandwich</option>
              <option value="dulce">Dulce</option>
              <option value="salado">Salado</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-orange">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductEdit;
