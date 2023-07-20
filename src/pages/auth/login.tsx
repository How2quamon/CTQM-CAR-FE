import React, { useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

export default function Login() {
    // const [isLoginForm, setIsLoginForm] = useState(true);

    // const handleToggleForm = () => {
    //     setIsLoginForm(!isLoginForm);
    // };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <head>
                <title>Create Next App</title>
            </head>
            <main className=" flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-[50px]">
                        <div className='mt-5'>
                            <h2 className='text-3xl font-bold text-black-500 mb-2'>
                                Sign in to Account
                            </h2>
                            <div className='border-2 w-10 border-black-500 inline-block mb-2'></div>
                            <div className='flex justify-center my-5'>
                                <p className='text-gray-400'>Welcome to the car shop CTQM</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3 '>
                            <Form
                                name="basic"    
                                className='max-w-[600px]'                            
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item className='w-[260px]'                                  
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input placeholder="Email" prefix={<MailOutlined rev={undefined} />}/>
                                </Form.Item>

                                <Form.Item className='w-[260px]'                                
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password placeholder="Password" prefix={<LockOutlined  rev={undefined} />}/>
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <div className="flex justify-start">
                                        <Checkbox>Remember me</Checkbox>
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <div className="flex justify-center">
                                    <Button className='border-2 border-slate-900  text-black-500  rounded-full px-10 py-2 font-semibold 
                            hover:bg-slate-900 hover:text-white flex items-center' htmlType="submit">
                                        Sign In
                                    </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="w-2/5 bg-slate-900 text-white rounded-tr-2xl round-br-2xl py-36 px-12">
                        <Link to={''}>
                            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                            <div className='border-2 w-10 border-white inline-block mb-2'></div>
                            <p className='mb-10'>Fill up personal information and start journey which us.</p>
                            <Link to={'/register'}>
                                <div className="flex justify-center">
                                    <Button className='border-2 border-white rounded-full px-10 py-2 flex items-center font-semibold hover:bg-white
                        hover:text-slate-900 text-white' htmlType="submit">
                                        Register
                                    </Button>
                                </div>
                            </Link>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};


