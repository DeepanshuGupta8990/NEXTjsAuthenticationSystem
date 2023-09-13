'use client'
import React,{useState} from 'react'
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmail } from '@/helpers/mailer';
import User from '../user/page';
import axios from 'axios';
import spinner from '@/images/spinner.gif';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckPage() {
    const router = useRouter();
    const toastOptions:any = {
        position:  "top-right",
        autoClose: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const [user,setUser] = useState({
        email:"",
    })
    const [isLoading,setIsLoading] = useState(false);
    const checkEmailFunc = async()=>{
        try {
            setIsLoading(true)
            console.log(user)
            const response = await axios.post("/api/users/checkEmail",user);
           console.log("response",response)
           if(response.data.success){
             toast.success("Check your email",toastOptions)
           }else if(!response.data.success){ 
            toast.error("Invalid email",toastOptions)
           }else{
             toast.error("Server error arrived",toastOptions)
           }
        } catch (err) {
            toast.error("Error arrived at frontend",toastOptions)
        }finally{
            setIsLoading(false)
        }
    }
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
     <div>
          {
            isLoading ? (<Image
                src={spinner}
                width={30}
                height={30}
                alt="Picture of the author"
              />) : (<button className="singupBtn" onClick={checkEmailFunc}>Send link to email</button>)
          }
         
     </div>
    </div>
    </Conatiner>
    <ToastContainer />
  </>
  )
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
       

        input[type='email']:focus{
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
     div{
        display: flex;
        flex-direction: row;
        .singupBtn{
            background-color: #a9c0c5;
            width: 14rem;
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
     }
    }
`

export function generateMetadata(){
    return {
      title:"Login page"
    }
  }