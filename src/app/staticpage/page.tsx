import React from "react";
import Seller from "../components/seller";

export default function page() {
  return (
    <div style={{width:"100vw",height:"95vh",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1>Static page</h1>
      <Seller/>
    </div>
  );
}
