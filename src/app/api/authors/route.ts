import { getAuthors, postAuthor } from "@/lib/data";
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
export const GET = async () =>{
    const authors:IAuthors[] = await getAuthors()
    return NextResponse.json({ data: authors, message: 'All Authors' })
}
export const POST = async (  req: NextApiRequest) =>{
  let data= await req.json()
    console.log(data);
    const authors:(IAuthors|null) = await postAuthor(data)
    return NextResponse.json({ data: authors, message: 'All Authors' })
}