"use client"
import React from 'react'
import { Button, Form, Input, Checkbox, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const onFinish = (values: any) => {
  console.log('Success:', values);
  axios.post("http://localhost:3000/api/authors",values)
  .then((data)=>{
    console.log(data);
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  name?: string;
  genre?: string;
  birthYear?: number;
  bio?: string;
  image?: string;
  isDead?: string;
  gender?: string;

};

function AddAuthor() {
  let date = new Date()
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
            name="image"
            rules={[
              { required: true, message: 'Please input bio!' },
              {
                max:150,
                message: 'Image must be less than 150 characters!',
                },
              {
                min:3,
                message: 'Image must be more than 3 characters!',
                },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value={true}>male</Option>
              <Option value={false}>female</Option>
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
        </Form>
    </main>
  )
}

export default AddAuthor
