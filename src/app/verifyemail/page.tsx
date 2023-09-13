'use client'
import axios from "axios";
import Link from "next/link";
import { NextRequest } from "next/server";
import React,{useEffect,useState} from "react";

export default function VerifyEmailPage({params}:{params:any}) {
    const [token, setToken] = useState('');
    const [verified,setverified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async ()=>{
        try {
            const response = await axios.post('/api/users/verifyemail',{token})
            console.log(response)
            if(response.data.success){
                setverified(true);
            }else{
                setError(true);
                console.log(response.data.err)
            }
        } catch (err:any) {
            setError(true);
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken);
    },[])

    useEffect(()=>{
      if(token.length>0){
        verifyUserEmail();
      }
    },[token])
  return (
    <div style={{width:"100vw",height:"95vh",display:"flex",justifyContent:"center",alignItems:"center",gap:'20px',flexDirection:"column"}}>
         <h1 style={{fontSize:'60px'}}>Verify Email</h1>
         <h2>{token ? `${token}` : "no token"}</h2>
         {
            verified && (
                <div>
                    <h2 style={{color:"green"}}>Email Verified </h2>
                     <Link href={"/login"} style={{textDecoration:"underline"}}>Login</Link>
                </div>
            )
         }
         {
            error && (
                <div>
                    <h2 style={{color:"red"}}>Error </h2>
                </div>
            )
         }
    </div>
  )
}
