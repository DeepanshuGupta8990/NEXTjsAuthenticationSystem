'use client'
import Link from "next/link";
import React,{useState,useEffect} from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { styled } from "styled-components"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import spinner from '@/images/spinner.gif'

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:""
    });
    const toastOptions:any = {
        position:  "top-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const onSignup = async ()=>{
       try{
        setIsLoading(true);
        const response = await axios.post("/api/users/signup",user);
        console.log('signup succes',response.data);
        if(response.data.status === 201){
            toast.success("Success",toastOptions)
            console.log('isLoading',setIsLoading)
            router.push('/login');
        }else{
            toast.error(response.data.err,toastOptions)
        }
       }catch(err:any){
        console.log(err.message);
        toast.error(err.message,toastOptions);
       }finally{
        setIsLoading(false)
       }
    }
    useEffect(() => {
      if(user.email.length>0 && user.password.length>0 && user.username.length){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    }, [user]);
  return (
    <>
        <Conatiner >
            <h2>Signup</h2>
        <div id="firstDiv">
            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} 
            placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} 
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
              />) : (<button id="singupBtn" onClick={onSignup} >{buttonDisabled ? "No Signup" : "Signup"}</button>) 
            }
            <Link href='/login'>Go to Login</Link>
         </div>

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
        #singupBtn{
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
`