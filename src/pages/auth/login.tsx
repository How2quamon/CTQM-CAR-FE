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
        // <div className="hero">
        //     <div className="form-box absolute w-[50%] top-[50%] left-[30%] backdrop-sepia-0 bg-white/30">
        //         <div className="button-box text-center text-3xl">
        //             <button type="button" className="toggle-btn " onClick={handleToggleForm}>
        //                 {isLoginForm ? 'Log In' : 'Register'}
        //             </button>
        //             <button type="button" className="toggle-btn items-center" onClick={handleToggleForm}>
        //                 {isLoginForm ? 'Register' : 'Log In'}
        //             </button>
        //         </div>
        //         {/* <div className="social-icons">
        //             <img src="~/images/login/mercedes-logo-png-mercedes-benz-logo-vector-icons-and-png-17.png" alt="Mercedes Logo" />
        //         </div> */}
        //         {isLoginForm ? (
        //             <form action="/Access/Check" method="post" id="Login" className="flex flex-col">
        //                 <div className=''>
        //                     <input type="email" name="Email" className="w-[340px]" placeholder="Your Email Here" required />
        //                 </div>
        //                 <input type="password" name="Password" className=" w-[340px]" placeholder="Enter Password" required />
        //                 <input type="checkbox" name="KeepLogedIn" className="check-box " />
        //                 <span>Keep me Logged in</span>
        //                 <button type="submit" className="submit-btn">LOG IN</button>
        //             </form>
        //         ) : (
        //             <form action="/KhachHangs/SignUp" method="post" id="Register" className="input-group">
        //                 <input type="email" name="NewEmail" className="input-field" placeholder="Your Email" required />
        //                 <input type="password" name="NewPassword" className="input-field" placeholder="Your Password" required />
        //                 <input type="text" name="NewName" className="input-field" placeholder="Your Name" required />
        //                 <input type="tel" name="NewPhone" className="input-field" placeholder="Your Phone" required />
        //                 <input type="checkbox" className="check-box" required />
        //                 <span>I agree to the terms &amp; conditions</span>
        //                 <button type="submit" className="submit-btn">REGISTER</button>
        //             </form>
        //         )}
        //     </div>
        //     {/* <Form className='absolute'>
        //         <Form.Item
        //             label="Username"
        //             name="username"
        //             rules={[{ required: true, message: 'Please input your username!' }]}
        //         >
        //             <Input  className='w-[100px]'/>
        //         </Form.Item>
        //         <Form.Item
        //             label="Password"
        //             name="password"
        //             rules={[{ required: true, message: 'Please input your password!' }]}
        //         >
        //             <Input.Password className='w-[100px]'/>
        //         </Form.Item>
        //     </Form> */}
        //     <img src="mec5.jpg" alt="Mercedes Main" className='h-screen font-medium bg-no-repeat bg-cover w-full' />
        // </div>
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


