'use client'
import React,{useState,useEffect, useRef} from 'react'
import { styled } from 'styled-components'
import spinner from '@/images/spinner.gif'
import Image from 'next/image'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 
import { useSearchParams } from 'next/navigation'

export default function UserProfile({params}:any) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const login = searchParams.get('login')
  const loginSuccessMez = useRef(true);
  const [isLoading,setIsLoading] = useState(false);
  const [products, setProducts] = useState<Array<{ title: string }>>([]);
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
      // console.log(response)
      setTimeout(()=>{
        router.push("/login?logout=success")
      },700)
    }catch(err:any){
      console.log(err.message);
      toast.error(err.message,toastOptions);
    }finally{
    setTimeout(()=>{
      setIsLoading(false);
    },500)
    }

  }
  
  useEffect(()=>{
    if(login==='success' && loginSuccessMez.current){
      console.log('login = ',login)
      toast.success("Login succesfully",toastOptions)
      loginSuccessMez.current = false
     }
  },[])

  useEffect(()=>{
    const func = async ()=>{
       const response = await axios.get("https://dummyjson.com/products")
      //  console.log(response.data.products)
       setProducts(response.data.products)
    }
    func()
  },[])

  return (
    <>
    <Cotainer>
    <div style={{display:'block'}}><p>  Profile owner {params.id}</p></div>
      {
            isLoading ? (<Image
              src={spinner}
              width={30}
              height={30}
              alt="Picture of the author"
            />) : (
            <button id="singupBtn" onClick={logout} >Logout1</button>
            ) 
      }
          <div style={{height:"40vh",overflow:'auto'}}>
        {products.map((product)=>{
            return(
                <>
                <p>{product.title}</p>
                </>
            )
        })}
     </div>
    </Cotainer>
    <ToastContainer />
  </>
  )
}

const Cotainer = styled.main`
    width: 100vw;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
`