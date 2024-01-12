"use client"
import Slider from "react-slick";
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ObjectId } from "mongoose";
import axios from "axios";
import { Button } from "antd";
import Link from "next/link";

function SliderComponent() {
    interface IAuthors {
      _id: ObjectId;
      name: string;
      genre: string;
      birthYear: number;
      bio: string;
      image: string;
      isDead: boolean;
      gender: boolean;
    }
    const[authors,setAuthors]=useState<IAuthors[]>([])
    useEffect(() => {
          // const data: IAuthors[] = await getAuthors();
          axios("http://localhost:3000/api/authors")
          .then((data)=>{
            const allDatas:IAuthors[] = data.data.data
            setAuthors(allDatas);
          })
  
  
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <>
    <Slider className="slider" {...settings}>
      {authors?.map((author,idx)=>(
        <div key={idx} className="slider-card">
          <img className="slider-image" alt={author?.name + " Image"} src={author?.image} />
          <Link href={"/authors/"+author._id}>
            <Button type="primary" className="info-button">Info</Button>
          </Link>
        </div>
      ))}
    </Slider>

    </>
  )
}

export default SliderComponent
