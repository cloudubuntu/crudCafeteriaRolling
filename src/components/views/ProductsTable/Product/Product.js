import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Product = ({product, URL, getApi}) => {
  const handleDelete=(id)=>{
    console.log(id);
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,      
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res=await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }            
          });
          console.log(res.status);
          if(res.status===200){
            getApi();
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  
  
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.productName}</td>
      <td>{product.price}</td>
      <td>
        <p className="truncate-img-link m-0">
          {product.urlImg}
        </p>
      </td>
      <td>{product.category}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link  to={`/product/edit/${product.id}`} className="btn-orange mx-1 text-decoration-none">Update</Link>
          <button className="btn-red mx-1" onClick={()=>{handleDelete(product.id)}}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
