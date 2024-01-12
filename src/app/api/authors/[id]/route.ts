import { deleteAuthor, getAuthor } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from "mongoose";
import{ NextResponse } from "next/server";
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

export const GET = async (req: NextApiRequest,{params}:{params:{id:string}}) =>{
    let { id } = params
    const author:(IAuthors|null) = await getAuthor(id)
    return NextResponse.json({ data: author, message: 'All Authors' })
}
export const DELETE = async (req: NextApiRequest,{params}:{params:{id:string}}) =>{
    let { id } = params
    const author:(IAuthors|null) = await deleteAuthor(id)
    return NextResponse.json({ data: author, message: 'All Authors' })
}
