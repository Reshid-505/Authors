"use client"
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { Button, Card, Skeleton } from "antd"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthorsBookCard from '@/components/AuthorsBookCard';

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
interface IBook {
  _id:ObjectId; 
  authorId: string; 
  name: string; 
  genre: string; 
  year: number; 
  coverImg: string; 
  description: string; 
  bookFile: string
}
function AuthorDetail({ params }: { params: { id: string } }) {
  const id: string = params.id
  const [author,setAuthor]=useState<(IAuthors|null)>()
  const [authorsBooks,setAuthorsBooks]=useState<IBook[]>([])
  // let author:(IAuthors | null) = await getAuthor(id)
  useEffect(() => {
    axios("http://localhost:3001/api/authors/"+id)
    .then((res)=>{
      const AuthorDatas:IAuthors = res.data
      setAuthor(AuthorDatas);
    })
    axios("http://localhost:3001/api/books/")
    .then((res)=>{
      if(res.data){
        setAuthorsBooks(res.data.filter((x:IBook)=>x.authorId==id))
      }
    })


}, []);
const route = useRouter()
  const date: Date = new Date()
  async function handleDelete(){
    console.log(id);
    // let deletedAuthor:(IAuthors | null) = await deleteAuthor(id)
    axios.delete("http://localhost:3001/api/authors/"+id)
    .then(()=>{
      route.push("/authors")
    })
  }
  return (
    <main className='container details-page'>
      {author?(<>
      <div style={{width:"35%"}} id='author-image'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={{width:"100%"}}  alt={author?.name + "Image"} src={author?.image} />
      </div>
      <div style={{width:"65%"}} id='info'>
        <h1>{author?.name}</h1>
        {(author?.birthYear) && <h2>{!author?.isDead?date.getFullYear() - author?.birthYear + " years old":"Dead"}</h2>}
        <h3>Genre:{author?.genre}</h3>
        <h3>Gender:{author?.gender?"Male":"Female"}</h3>
        <h4>Biography: <br /><i>{author?.bio}</i></h4>
        <Button style={{margin:"10px 0"}} type='primary' danger onClick={()=>{handleDelete()}}>Delete</Button>
        <Link href={`/edit/${id}`}>
          <Button style={{margin:"10px"}} type='primary'>Edit</Button>
        </Link>
        <Link href={`/add/book/${id}`}>
          <Button style={{margin:"10px"}} type='primary'>Add Book</Button>
        </Link>
        <br />
        {authorsBooks[0] && authorsBooks.map((book:IBook,idx:number): any=>{
          return(<AuthorsBookCard key={idx} book={book}  />)
        })}
      </div>
      </>):(<Skeleton avatar active paragraph={{ rows: 4 }} />)}
    </main>
  )
}

export default AuthorDetail
