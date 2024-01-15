"use client"
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Checkbox, Select, message, Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ObjectId } from 'mongoose';

const { Option } = Select;

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

const beforeUpload = (file: any) => {
  const isJpgOrJpeg = file.type === 'image/jpeg' || file.type === 'image/jpeg';
  if (!isJpgOrJpeg) {
    message.error('You can only upload JPG/JPEG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return (isJpgOrJpeg && isLt2M) || Upload.LIST_IGNORE;
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type FieldType = {
  name?: string;
  genre?: string;
  birthYear?: number;
  bio?: string;
  file?: object;
  isDead?: string;
  gender?: string;

};

function EditAuthor({ params }: { params: { id: string } }) {
  const {id} = params
  const [authorData,setAuthorData] = useState<IAuthors | undefined>(undefined)
  useEffect(()=>{
    axios("http://localhost:3001/api/authors/"+id)
    .then((res: {data:IAuthors}): void=>{
      setAuthorData(res.data)
    })
  },[])
  const route = useRouter()

  const onFinish = (values: any) => {
    if(values.file){
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', values.file.file.originFileObj);
      cloudinaryData.append('upload_preset', "bcq2gvnn");
      axios.post("https://api.cloudinary.com/v1_1/dsnv3qe3n/image/upload",cloudinaryData)
      .then((res)=>{
          console.log(res.data);
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('genre', values.genre);
          formData.append('birthYear', values.birthYear);
          formData.append('bio', values.bio);
          formData.append('gender', values.gender);
          formData.append('isDead', values.isDead);
          formData.append('file', values.file.file.originFileObj);
          formData.append('image', res.data.secure_url);
        axios.patch("http://localhost:3001/api/authors/"+id,formData)
        .then((data)=>{
          route.push("/authors/"+id)
        })
        })
    }else{
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('genre', values.genre);
          formData.append('birthYear', values.birthYear);
          formData.append('bio', values.bio);
          formData.append('gender', values.gender);
          formData.append('isDead', values.isDead);
        axios.patch("http://localhost:3001/api/authors/"+id,formData)
        .then((data)=>{
          route.push("/authors/"+id)
        })
    }
  };
  const date = new Date()
  return (
    <main className='conainer' style={{display:"flex",justifyContent:"center"}}>
      {authorData && 
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, }}
          initialValues={{ 
            name: authorData?.name,
            genre: authorData?.genre,
            birthYear: authorData?.birthYear,
            bio: authorData?.bio,
            isDead: authorData?.isDead,
            gender: authorData?.gender
           }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input author name!' },
            {
              max:150,
              message: 'Name must be less than 150 characters!',
              },
            {
              min:3,
              message: 'Name must be more than 3 characters!',
              },
          ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Genre"
            name="genre"
            rules={[
              { required: true, message: 'Please input genre!' },
              {
                max:150,
                message: 'Genre must be less than 150 characters!',
                },
              {
                min:3,
                message: 'Genre must be more than 3 characters!',
                },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item<FieldType>
            label="Birth Year"
            name="birthYear"
            rules={[
              { required: true, message: 'Please input birth year!' },
              {validator:(rule,value)=>(value<=date.getFullYear() && value>0)?Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              message: 'Year not correct!',}
            ]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<FieldType>
            label="Bio"
            name="bio"
            rules={[
              { required: true, message: 'Please input bio!' },
              {
                max:150,
                message: 'Bio must be less than 150 characters!',
                },
              {
                min:3,
                message: 'Bio must be more than 3 characters!',
                },
            ]}

          >
            <Input />
          </Form.Item>


          <Form.Item<FieldType>
            label="Image"
            name="file"
          >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            maxCount={1}
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload </Button>
          </Upload>

          </Form.Item>
  
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value={true}>Male</Option>
              <Option value={false}>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="isDead"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>is Dead</Checkbox>
          </Form.Item>




          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>}
    </main>
  )
}

export default EditAuthor
