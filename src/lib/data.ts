import { ObjectId } from "mongoose";
import { Authors } from "./models";
import { connectToDb } from "./utils";

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

export async function getAuthors(): Promise<IAuthors[]> {
  try {
    await connectToDb();
    const authors = await Authors.find();
    return authors.map(author => author.toObject() as IAuthors);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get data!");
  }
}

export async function getAuthor(id: string): Promise<IAuthors | null> {
  try {
    const author = await Authors.findById(id);
    if (author) {
        return author.toObject() as IAuthors;
    } else {
        return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get author!");
  }
}

export async function deleteAuthor(id: string): Promise<IAuthors | null> {
  try {
    const deletedAuthor = await Authors.findByIdAndDelete(id);
    if (deletedAuthor) {
        return deletedAuthor.toObject() as IAuthors;
    } else {
        return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete author!");
  }
}

export async function postAuthor(data: IAuthors): Promise<IAuthors | null> {
  try {
    const newAuthor = new Authors(data);
    const savedAuthor = await newAuthor.save();
    if (savedAuthor) {
        return savedAuthor.toObject() as IAuthors;
    } else {
        return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to post author!");
  }
}

export async function patchAuthor(id: string, data: Partial<IAuthors>): Promise<IAuthors | null> {
  try {
    const updatedAuthor = await Authors.findByIdAndUpdate(id, data);
    if (updatedAuthor) {
        return updatedAuthor.toObject() as IAuthors;
    } else {
        return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update author!");
  }
}
