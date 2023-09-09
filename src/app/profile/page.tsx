'use client'
import React,{useState} from 'react'
import { styled } from 'styled-components'
import spinner from '@/images/spinner.gif'
import Image from 'next/image'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 
export default function Profile() {
  const router = useRouter();
  const [data,setData] = useState('nothing');
  const [isLoading,setIsLoading] = useState(false);
  const toastOptions:any = {
    position:  "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};
  const logout = async()=>{
    try{
      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log(response)
      toast.success("Logout Succesfully",toastOptions);
      setTimeout(()=>{
        router.push("/login")
      },500)
    }catch(err:any){
      console.log(err.message);
      toast.error(err.message,toastOptions);
    }finally{
      setIsLoading(false);
    }

  }

  const getUserDetails = async ()=>{
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  }
  
  return (
    <Cotainer>
    <div style={{display:'block'}}><p>  Profile owner</p></div>
    <button className="singupBtn" onClick={getUserDetails}>Get data</button>
      {
            isLoading ? (<Image
              src={spinner}
              width={30}
              height={30}
              alt="Picture of the author"
            />) : (<button className="singupBtn" onClick={logout} >Logout</button>) 
      }
    </Cotainer>
  )
}

const Cotainer = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        `