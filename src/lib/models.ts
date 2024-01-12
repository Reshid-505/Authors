import mongoose from "mongoose";

const AuthorsSchema= new mongoose.Schema({
    "name":String,
    "genre":String,
    "birthYear":Number,
    "bio":String,
    "image":String,
    "isDead":Boolean,
    "gender":Boolean
  },{versionKey: false})
  export const Authors = mongoose.models?.Authors || mongoose.model("Authors",AuthorsSchema) 