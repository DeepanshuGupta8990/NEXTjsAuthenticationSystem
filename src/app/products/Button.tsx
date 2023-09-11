'use client'

import styled from "styled-components"

export default function Button({text,title}:{text:string,title:string}) {
  return (
      <Bt onClick={()=>{alert(title)}}>{text}</Bt>
  )
}

const Bt = styled.button`
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
`