import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Register() {
    const navigate =useNavigate()
    const onFinish= async(values)=>{
        try {
            const response =await axios.post('/api/user/register',values)
            console.log(response);
            if(response.data.success)
            {
                toast.success(response.data.message)
                toast("Redirecting To Login Page")
                navigate('/login')
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
             toast.error("Something went wrong")
        }
    }

  return (
   <div className='authentication'>
    <div className='authentication-form card p-4'>
        <h1 className='card-title '>Nice To Meet You</h1>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Name' name='name'>
                <Input placeholder='Name'/>
           </Form.Item>
           <Form.Item label='Email' name='email'>
                <Input placeholder='Email'/>
           </Form.Item>
           <Form.Item label='Password' name='password'>
                <Input placeholder='Password' type='password'/>
           </Form.Item>
           <Button className='primary-button my-2' htmlType='submit'>Register</Button>
           <Link to='/login' className='anchor mt-2'>Click To Login</Link>
        </Form>
    </div>

   </div>
  )
}

export default Register