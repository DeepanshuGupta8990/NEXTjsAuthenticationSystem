
import axios from 'axios';
import React from 'react'
import Button from './Button';
import Image from 'next/image';

async function productList() {
  let response = await axios.get("https://dummyjson.com/products");
  return response.data.products

}

export default async function page() {
    let products = await productList();
    // console.log(products)
  return (
    <div style={{overflow:"hidden",height:'94vh'}}>
    <Image src='https://media.istockphoto.com/id/1409704770/photo/close-up-lavender-flowers-in-beautiful-field-at-sunset.jpg?s=1024x1024&w=is&k=20&c=AMncBX6r3gLl3MgfobtBI013noVbZk7JAUparGJFCME=' width={240} height={200} alt='image'/>
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
     </div>
  )
}

export function generateMetadata(){
  return {
    title:"Products page"
  }
}