import axios from 'axios';
import React from 'react'
import Button from './Button';

async function productList() {
  let response = await axios.get("https://dummyjson.com/products");
  return response.data.products

}

export default async function page() {
    let products = await productList();
    // console.log(products)
  return (
    <div style={{height:"80vh",overflow:'auto',display:'flex',flexDirection:"column",alignItems:'center',gap:'10px'}}>
      {
           products.map((product:any)=>{
            return(
              <div style={{display:"flex",flexDirection:"row",gap:'10px'}}>
              <p>{product.title}</p>
              <Button text='Click' title={product.title}/>
              </div>
            )
          })
      }
    </div>
  )
}
