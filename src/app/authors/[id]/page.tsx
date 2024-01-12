"use client"
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { Button, Skeleton } from "antd"
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
function AuthorDetail({ params }: { params: { id: string } }) {
  const id: string = params.id
  const [author,setAuthor]=useState<(IAuthors|null)>()
  // let author:(IAuthors | null) = await getAuthor(id)
  useEffect(() => {
    axios("http://localhost:3000/api/authors/"+id)
    .then((data)=>{
      const AuthorDatas:IAuthors = data.data.data
      setAuthor(AuthorDatas);
    })


}, []);
const route = useRouter()
  const date: Date = new Date()
  async function handleDelete(){
    console.log(id);
    // let deletedAuthor:(IAuthors | null) = await deleteAuthor(id)
    axios.delete("http://localhost:3000/api/authors/"+id)
    .then(()=>{
      route.push("/authors")
    })
  }
  return (
    <main className='container details-page'>
      {author?(<>
      <div id='author-image'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={author?.name + "Image"} src={author?.image} />
      </div>
      <div id='info'>
        <h1>{author?.name}</h1>
        {(author?.birthYear) && <h2>{!author?.isDead?date.getFullYear() - author?.birthYear + "years old":"Dead"}</h2>}
        <h3>Genre:{author?.genre}</h3>
        <h3>Gender:{author?.gender?"Male":"Female"}</h3>
        <h4>Biography: <br /><i>{author?.bio}</i></h4>
        <Button style={{margin:"10px 0"}} type='primary' danger onClick={()=>{handleDelete()}}>Delete</Button>
      </div>
      </>):(<Skeleton avatar paragraph={{ rows: 4 }} />)}
    </main>
  )
}

export default AuthorDetail
