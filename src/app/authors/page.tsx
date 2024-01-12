"use client"
import AuthorCard from '@/components/AuthorCard';
import axios from 'axios';
import { Input, Select } from 'antd';
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react'

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
function Authors() {
  const[authors,setAuthors]=useState<IAuthors[]>([])
  const[filteredData,setFilteredData]=useState<IAuthors[]>([])
  useEffect(() => {
        // const data: IAuthors[] = await getAuthors();
        axios("http://localhost:3000/api/authors")
        .then((data)=>{
          const allDatas:IAuthors[] = data.data.data
          setAuthors(allDatas);
          setFilteredData(allDatas);
          
        })


  }, []);
  

  const onChange = (value: (boolean | string)) => {
    if(value=="all"){
      setFilteredData([...authors])
    }else{
      setFilteredData([...authors.filter(x=>x.gender===value)])
    }
  };

  const filterOption = (input: string, option?: { label: string; value: (boolean | string) }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  function handleSearch(seacrhData:string){
    setFilteredData(authors.filter(x=>x.name.toLowerCase().includes(seacrhData.toLowerCase().trim())))
  }
  return (
    <main className='container'>
      <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
        <Input onChange={(e)=>{handleSearch(e.target.value)}} style={{margin:"10px auto"}} placeholder="Search" />
        <Select
        showSearch
        placeholder="Gender"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        options={[
          {
            value: "all",
            label: 'All',
          },
          {
            value: true,
            label: 'Male',
          },
          {
            value: false,
            label: 'Female',
          },
        ]}
        />
      </div>

      <div className='cards'>
        {filteredData?.map((author:IAuthors,idx:number)=><AuthorCard key={idx} author={author} />)}
      </div>
    </main>
  )
}

export default Authors
