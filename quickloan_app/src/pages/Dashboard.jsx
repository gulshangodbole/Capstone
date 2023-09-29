import {  Table, TableContainer, Tbody, Td,  Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import styled from 'styled-components'
import p1 from "../Images/p1.webp"
import p2 from "../Images/p2.webp"
import p3 from "../Images/p3.webp"
import p4 from "../Images/p4.webp"
import p5 from "../Images/p5.webp"
import p6 from "../Images/p6.webp"
import p7 from "../Images/p7.webp"
import p8 from "../Images/Natwest_Secondary_Horizontal_RGB_NEG.svg";
export default function Dashboard() {
  const { id } = useParams()
  const [data, setdata] = useState("")

  // const fetchdata = () => {
  //   axios.get(`https://sour-snowy-purpose.glitch.me/banks/${id}`)
  //     .then((res) => {
  //       console.log(res.data)
  //       setdata(res.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  
  // useEffect(() => {
  //   fetchdata()
  // }, [id])

  const { name, image, amount, interest, category, extra } = {
    name: "NatWest",
    image: p8,
    amount: 1,
    interest: 14,
    category: id, // Assign the 'id' variable here
    extra: 1
  };

  return (
    <DIV>
      <div className='bottom'>
        <h2>Quick Links To Handle Your {category}</h2>
        <div className='bottom-section'>
          <div className='B-section-part'>
            <img src={p1} alt="" />
            <h3>{name}{category}<h3>Interest Rate</h3></h3>
          </div>
          <div className='B-section-part'>
            <img src={p2} alt="" />
            <h3>{name}{category}</h3>
            <h3>Eligibility</h3>
          </div>
          <div className='B-section-part'>
            <img src={p3} alt="" />
            <h3>{name}{category}</h3>
            <h3>Status Check</h3>
          </div>
          <div className='B-section-part'>
            <img src={p4} alt="" />
            <h3>{name}{category}</h3>
            <Link to='/support'> <h3>Customer Care</h3></Link>
          </div>
          <div className='B-section-part'>
            <img src={p5} alt="" />
            <h3>{name}{category} </h3>
            <h3>Rejection</h3>
          </div>
          <div className='B-section-part'>
            <img src={p6} alt="" />
            <h3>{name}{category}</h3>
            <h3>Missed</h3>
          </div>
          <div className='B-section-part'>
            <img src={p7} alt="" />
            <h3>{name}{category} </h3>
            <Link to='/calculator'><h3>Calculator Online</h3></Link>
          </div>
        </div>
      </div>
    </DIV>
  )
}

const DIV = styled.div`
  padding: 50px;
  background-color: #f2f2f2;

  .parent {
    width: 95%;
    margin: auto;

  }

  h1 {
    color: #003366;
    font-size: 30px;
    font-weight: bold;
  }

  .section {
   
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #ffffff;
    margin-top: 30px;
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .sectionA {
    width: 38%;
   
    display: flex;
    justify-content: space-between;
    h2{
      padding-top: 25px;
      font-size: 20px;
      font-weight: lighter;
    }
  }

  .sectionB {
    width: 40%;
 
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    p{
      font-size: 18px;
    }
    p:nth-child(2){
      font-weight:bold;
      margin-top: 5px;
      
    }
  }

  .sectionC {
    width: 25%;
    

    button {
      border-radius: 10px;
      width: 50%;
      height: 50px;
      background-color: #ff9900;
    }
  }

  .bottom {
    width: 90%;
    margin: auto;
    margin-top: 30px;
    
    h2 {
      font-size: 22px;
    }
  }

  .bottom-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 180px;
    gap: 30px;
  }

  .B-section-part {
    background-color: #ffffff;
    border-radius: 10px;
    
    img {
      margin: auto;
      padding: 10px;
      padding-top: 30px;
    }

    font-size: 18px;

    h3:hover{
      text-decoration:underline;
      cursor: pointer;
    }
  }
  //responsive code



  @media (min-width: 768px)and (max-width:1200px) {
    /* Adjust styles for tablets and smaller screens */
    .section {
      flex-direction: column;
      align-items: center;
   
    }

    .sectionA,
    .sectionB,
    .sectionC {
      width: 80%;
      text-align: center;
      margin-top: 10px;
    }
    .sectionA{
      justify-content: space-around;
      img{
        width: 30%;
        border: 1px solid yellow;
        
      }
    }

    .sectionB {
      flex-direction: column;
      align-items: center;
      gap: 10px;

      p {
        font-size: 16px;
        margin: 0;
      }
    }

    .sectionC {
      button {
        width: 70%; 
      }
    }
    .bottom-section {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 200px;
      gap: 20px;
    }
    .B-section-part {
      font-size: 16px;
      padding: 5px;
    }
  }



  // small screen
  @media (max-width: 770px) {
    /* Adjust styles for mobile devices */
    .section{
      flex-direction: column;
    }
    .sectionA {
      flex-direction: column;
      align-items: center;

      h2 {
        padding-top: 10px;
        font-size: 18px;
      }
    }

    .sectionB {
      flex-direction: column;
      align-items: center;
      gap: 5px;

      p {
        font-size: 14px;
      }
    }

    .sectionC {
      button {
        width: 80%;
        height: 40px;
        font-size: 14px;
      }
    }

    .bottom-section {
   
      
      grid-template-columns: repeat(1, 250px);
      grid-auto-rows: 160px;
      
      gap: 15px;
      justify-content:space-around;
    }

    .B-section-part {
      font-size: 16px;
    }
  }
`
 
  
  
  
  
  
  
  
  
  
 
