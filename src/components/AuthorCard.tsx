import React from 'react'
import { Card } from 'antd';
import { ObjectId } from 'mongoose';
import Link from 'next/link';

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
function AuthorCard({author}:{author: IAuthors}) {
  const date: Date = new Date()
    
  return (
    <>
    <Link href={"/authors/"+author._id}>
      <Card
      hoverable
      style={{ width: 240 }}
      cover={<img style={{height:300,objectFit:"cover"}} alt={author.name + "Image"} src={author.image} />}
      >
        <h1>{author.name}</h1>
        {(author?.birthYear) && <h2>{!author?.isDead?date.getFullYear() - author?.birthYear + " years old":"Dead"}</h2>}
        <h3>Genre:{author.genre}</h3>
        <h3>Gender:{author.gender?"Male":"Female"}</h3>
      </Card>
    </Link>
    </>
  )
}

export default AuthorCard
