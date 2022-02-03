import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {validateProductName, validatePrice, validateUrl, validateCategory} from "../../helpers/ValidateFields";

const ProductCreate = ({URL, getApi}) => {
  //useState
  const [productName, setProductName]=useState('');
  const [price, setPrice]=useState(0);
  const [urlImg, setUrlImg]=useState('');
  const [category, setCategory]=useState('');

  //useNavigate
  const navigate=useNavigate();
  
  //funcion para crear un product
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!validateProductName(productName) || !validatePrice(price) || !validateUrl(urlImg) || !validateCategory(category)){
      Swal.fire(
        'OOPS!',
        'ERROR',
        'error'
      )
      return
    }else{
      const newProduct={
        productName,
        price,
        urlImg,
        category
      }
      console.log(newProduct);
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        
        confirmButtonText: 'Yes, SAVE!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          try{
            const res=await fetch(URL, {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(newProduct)
            });
            console.log(res);
            if(res.status===201){
              Swal.fire(
                'SAVED!',
                'Your file has saved.',
                'success'
              )
              getApi();
              navigate("/product/table");
            }
          }catch(error){
            console.log(error);
          }
         
        }
      })
    }
  }
  return (
    <div>
      <Container className="py-5">
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control type="text" placeholder="Ej: Café" onChange={(e)=>{setProductName(e.target.value.trimStart())}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control type="number" placeholder="Ej: 50" onChange={(e)=>{setPrice(e.target.value.trimStart())}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e)=>{setUrlImg(e.target.value.trimStart())}}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox" >
            <Form.Label>Category*</Form.Label>
            <Form.Select onChange={(e)=>{setCategory(e.target.value)}}>
              <option value="">Select an option</option>
              <option value="bebida-caliente">Bebida Caliente</option>
              <option value="bebida-fria">Bebida Fria</option>
              <option value="sandwitch">Sandwich</option>
              <option value="dulce">Dulce</option>
              <option value="salado">Salado</option>
              
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
