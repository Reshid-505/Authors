"use client"
import React from 'react'
import { Button, Card } from 'antd';
import { ObjectId } from 'mongoose';
import FileDownload from 'react-file-download';

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
function AuthorsBookCard({book}:{book: IBook}) {
    const handleDownload = () => {
        FileDownload(book.bookFile, `${book.name}.pdf`);
      };
  return (
    <>
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img style={{height:300,objectFit:"cover"}} alt={book.name + "Image"} src={book.coverImg} />}
        >
        <h1>{book.name}</h1>
        <Button type='primary' onClick={handleDownload}>Download</Button>
        </Card>
    </>
  )
}

export default AuthorsBookCard
