"use client"
import React from 'react'
import { Button, Form, Input, Checkbox, Select, message, Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const beforeUploadCoverImg = (file: any) => {
  const isJpgOrJpeg = file.type === 'image/jpg' || file.type === 'image/jpeg';
  if (!isJpgOrJpeg) {
    message.error('You can only upload JPG/JPEG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return (isJpgOrJpeg && isLt2M) || Upload.LIST_IGNORE;
};

const beforeUploadBookFile = (file: any) => {
  const isPdf = file.type === 'image/pdf';
  if (!isPdf) {
    message.error('You can only upload PDF file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isPdf || Upload.LIST_IGNORE;
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type FieldType = {
  name?: string;
  genre?: string;
  year?: number;
  description?: string;
  coverImg?: object;
  bookFile?: object;
};

function AddBook({ params }: { params: { id: string } }) {
  const {id} = params
  const route = useRouter()

  const onFinish = (values: any) => {
    console.log(values);
    const cloudinaryImageData = new FormData();
    const cloudinaryFileData = new FormData();
    const formData = new FormData();
    cloudinaryImageData.append('file', values.coverImg.file.originFileObj);
    cloudinaryImageData.append('upload_preset', "bcq2gvnn");

    formData.append('authorId', id);
    formData.append('name', values.name);
    formData.append('genre', values.genre);
    formData.append('year', values.year);
    formData.append('description', values.description);
    formData.append('file', values.coverImg.file.originFileObj);
    axios.post("https://api.cloudinary.com/v1_1/dsnv3qe3n/image/upload",cloudinaryImageData)
    .then((res)=>{
        formData.append('coverImg', res.data.secure_url);
        cloudinaryFileData.append('file', values.bookFile.file.originFileObj);
        cloudinaryFileData.append('upload_preset', "bcq2gvnn");
        axios.post("https://api.cloudinary.com/v1_1/dsnv3qe3n/image/upload",cloudinaryFileData)
        .then((res)=>{
              formData.append('bookFile', res.data.secure_url);
              axios.post("http://localhost:3001/api/books",formData)
              .then((data)=>{
                route.push("/authors/"+id)
              })
        })

      })
  };
  const date = new Date()
  return (
    <main className='conainer' style={{display:"flex",justifyContent:"center"}}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, }}
          initialValues={{ remember: true }}
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
            label="Year"
            name="year"
            rules={[
              { required: true, message: 'Please input birth year!' },
              {validator:(rule,value)=>(value<=date.getFullYear() && value>0)?Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              message: 'Year not correct!',}
            ]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input description!' },
              {
                max:150,
                message: 'Description must be less than 150 characters!',
                },
              {
                min:3,
                message: 'Description must be more than 3 characters!',
                },
            ]}

          >
            <Input />
          </Form.Item>


          <Form.Item<FieldType>
            label="Cover Image"
            name="coverImg"
            rules={[
              { required: true, message: 'Please input cover image!' },
            ]}
          >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            beforeUpload={beforeUploadCoverImg}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload </Button>
          </Upload>
          </Form.Item>

          <Form.Item<FieldType>
            label="Book File"
            name="bookFile"
            rules={[
              { required: true, message: 'Please input cover image!' },
            ]}
          >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload </Button>
          </Upload>

          </Form.Item>





          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
    </main>
  )
}

export default AddBook
