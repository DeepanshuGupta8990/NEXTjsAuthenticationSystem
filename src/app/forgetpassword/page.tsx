'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React,{useEffect,useState} from "react";
import spinner from '@/images/spinner.gif'
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyEmailPage({params}:{params:any}) {
    const toastOptions:any = {
        position:  "top-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [token, setToken] = useState('');
    const [verified,setverified] = useState(false);
    const [error,setError] = useState(false);
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState({
        password:"",
        confirmPassword:"",
        token:token
    });

    const verifyUser = async ()=>{
        try {
            const response = await axios.post('/api/users/forgetpassword',{token})
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
    const changePassword = async()=>{
      try {
        if(user.password!=='' && user.confirmPassword!==''){
            const a = user.password;
            const b = user.confirmPassword;
            console.log(user.password," ",user.confirmPassword)
           if(a === b){
            setIsLoading(true);
            const response = await axios.put("/api/users/changepassword",user);
            console.log(response)
            if(response.data.success){
                toast.success("Password succesfully changed",toastOptions);
                setTimeout(()=>{
                    router.push("/login");
                },600)
            }
        }else{
            toast.error("Please provide same password",toastOptions)
           }
        }else{
            toast.error("Please fill all fields",toastOptions)
        }
      } catch (err:any) {
        toast.error(err.message,toastOptions)
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(()=>{
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken);
      setUser({...user,token:urlToken})
    },[])

    useEffect(()=>{
      if(token.length>0){
        verifyUser();
      }
    },[token])
  return (
    <>
    <div style={{width:"100vw",height:"95vh",display:"flex",justifyContent:"center",alignItems:"center",gap:'20px',flexDirection:"column"}}>
         <h1 style={{fontSize:'60px'}}>Change password</h1>
         {
             verified ? (
                <Container style={{display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center',width:"40vw",height:"40vh",border:"2px solid white"}}>
                       <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} 
            placeholder="password"
            />
                       <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={user.confirmPassword} onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} 
            placeholder="confirmPassword"
            />
            {

             isLoading ? (<Image
                src={spinner}
                width={30}
                height={30}
                alt="Picture of the author"
              />) : (<button onClick={changePassword}>Change Password</button>)
            }
                </Container>
            ) : (<Image
                src={spinner}
                width={30}
                height={30}
                alt="Picture of the author"
                />)
            }
         {
             error && (
                 <div>
                    <h2 style={{color:"red"}}>Invalid Token </h2>
                </div>
            )
         }
    </div>
    <ToastContainer />
            </>
  )
}

const Container = styled.div`
     box-shadow: 0px 0px 12px 12px #a9a7a7;
        input[type='password']:focus{
            box-shadow: 0px 0px 1px 1px cyan;
        }
        input[type='password']{
            width: "90%";
            height: 2rem;
            border-radius: 0.2rem;
            border: none;
            outline: none;
            padding: 0.5rem;
        }
        button{
            background-color: #a9c0c5;
            width: 12rem;
            height: 2rem;
            border-radius: 0.2rem;
            transition: 0.3s ease;
            &:hover{
                background-color: #6ecfd6;
            }
            &:active{
                transform: scale(0.95);
            }
        }
`

// http://localhost:3000/forgetpassword?token=$2a$10$XdFhROCECGsQkSp1QrNkjuFkYlvGn.6xLyQFpy0ub64aIwXcNH/iW