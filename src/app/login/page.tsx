'use client'
import Link from "next/link";
import React, { useEffect, useState,useRef } from "react";
import { useRouter } from "next/navigation"; 
import { styled } from "styled-components"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import spinner from '@/images/spinner.gif';
import { useSearchParams } from 'next/navigation'
import axios from "axios";
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const logout = searchParams.get('logout')
    const logoutSuccessMez = useRef(true);
    const [isLoading,setIsLoading] = useState(false);
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const toastOptions:any = {
        position:  "top-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      const onLogin = async()=>{
         try{
            setIsLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log(response)
            if(response.data.success){
            // toast.success("Login Succesfully",toastOptions);
            setTimeout(()=>{
                router.push(`/profile/${response.data.userProfile.username}?login=success`)
            },100)
            }else{
                toast.error(response.data.err,toastOptions)
            }
         }catch(err:any){
            console.log(err.message);
            toast.error(err.message,toastOptions);
         }
         finally{
            setIsLoading(false);
         }
      }

      useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
          }else{
            setButtonDisabled(true);
          }
      },[user])
        
  useEffect(()=>{
    if(logout==='success' && logoutSuccessMez.current){
      console.log('logout = ',logout)
      toast.success("Logout succesfully",toastOptions)
      logoutSuccessMez.current = false
     }
  },[])


      
  return (
    <>
    <Conatiner >
        <h2>Login</h2>
    <div id="firstDiv">
        <hr />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} 
        placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} 
        placeholder="password"
        />
     <div>
     {
             isLoading ? (<Image
                src={spinner}
                width={30}
                height={30}
                alt="Picture of the author"
              />) : (<button className="singupBtn" onClick={onLogin} >{buttonDisabled ? "No Login" : "Login"}</button>) 
            }
        <Link href='/signup'>Go to Signup</Link>
     </div>
     <button className="forget" onClick={()=>{router.push("/checkEmail")}} >Forget Password</button>
    </div>
    </Conatiner>
    <ToastContainer />
    </>
  );
}

const Conatiner = styled.main`
    width: 100vw;
    height: 95vh;
    padding: 24;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 1.5s ease;
    animation: animate 1.5s ease forwards;
    opacity: 0;
    @keyframes animate {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    #firstDiv{
        margin: 10px;
        padding: 30px 20px;
        border: 4px solid #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 12px 12px #a9a7a7;
    }
    h2{
            color: black;
            font-size: 2rem;
        }
    div{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
       
        #username{
            width: 24rem;
            height: 2rem;
            border-radius: 0.2rem;
            border: none;
            outline: none;
            padding: 0.5rem;
        }
        input[type='text']:focus{
            box-shadow: 0px 0px 1px 1px cyan;
        }
        input[type='email']:focus{
            box-shadow: 0px 0px 1px 1px cyan;
        }
        input[type='password']:focus{
            box-shadow: 0px 0px 1px 1px cyan;
        }
        #email{
            width: 24rem;
            height: 2rem;
            border-radius: 0.2rem;
            border: none;
            outline: none;
            padding: 0.5rem;
        }
        #password{
            width: 24rem;
            height: 2rem;
            border-radius: 0.2rem;
            border: none;
            outline: none;
            padding: 0.5rem;
        }
     div{
        display: flex;
        flex-direction: row;
        .singupBtn{
            background-color: #a9c0c5;
            width: 6rem;
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
        a{
            text-decoration: underline;
            transition: 0.3s ease;
            &:hover{
                color: blue;
            }
        }
     }
    }
    .forget{
            background-color: #a9c0c5;
            width: 13rem;
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

export function generateMetadata(){
    return {
      title:"Login page"
    }
  }