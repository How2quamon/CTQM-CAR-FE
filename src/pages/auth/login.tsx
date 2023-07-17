import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
interface VMLogin {
    Email: string;
    Password: string;
    KeepLogedIn: boolean;
    NewEmail: string;
    NewPassword: string;
    NewName: string;
    NewPhone: string;
}

export default function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };
 
    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <head>
                <title>Create Next App</title>
            </head>
            <main className=" flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            <span className='text-gray-500'>CTQM</span>Group
                        </div>
                        <div className='mt-5'>
                            <h2 className='text-3xl font-bold text-black-500 mb-2'>
                                Sign in to Account
                            </h2>
                            <div className='border-2 w-10 border-black-500 inline-block mb-2'></div>
                            <div className='flex justify-center my-2'>
                                <p className='text-gray-400'>Welcome to the car shop CTQM</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-3 '>
                            <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                <FaEnvelope className='text-gray-400 m-2' />
                                <input type='email' name='email' placeholder='Email' className='bg-gray-100 outline-none text-sm 
                            flex-1'/>
                            </div>
                            <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                <MdLockOutline className='text-gray-400 m-2' />
                                <input type='password' name='password' placeholder='Password' className='bg-gray-100 outline-none text-sm 
                            flex-1'/>
                            </div>
                            <div className='flex justify-between w-64 mb-5'>
                                <label className='flex items-center text-xs'><input type='checkbox' name='remember'
                                    className='mr-1' />Remember me</label>
                                <a href='#' className='text-xs '>Forgot Password?</a>
                            </div>
                            <a href='#' className='border-2 border-slate-900  text-black-500  rounded-full px-12 py-2 inline-block font-semibold 
                            hover:bg-slate-900 hover:text-white'>Sgin in</a>
                        </div>
                    </div>
                    <div className="w-2/5 bg-slate-900 text-white rounded-tr-2xl round-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>Fill up personal information and start journey which us.</p>
                        <a href='/register' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
                        hover:text-slate-900'>Register</a>
                    </div>
                </div>
            </main>
        </div>
    );
};


