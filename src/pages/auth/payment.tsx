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
        // <header className=' w-[100vw] min-h-screen bg-[#34495e] text-[1.2rem] flex justify-center items-center'> 
        //     <div className='rounded-2xl shadow-2xl bg-white max-w-[800px] min-h-[500px] flex justify-between items-start p-[0.5rem]-[1.5rem]'> 
        //         <div className='basis-2/4'> 
        //             <h3>BILLING ADDRESS</h3>
        //             <form className='p-[1rem]'>
        //                 Full Name
        //                 <input type='text' name='' placeholder='Enter name' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 Email
        //                 <input type='text' name=' ' placeholder='Enter email ' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 Address
        //                 <input type='text' name=' ' placeholder='Enter address' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 City
        //                 <input type='text' name=' ' placeholder='Enter city' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 <div className='flex mt-[0.5rem]'>
        //                     <label>
        //                         State
        //                         <select className='padding: 0.5rem 0.7rem'>
        //                             <option>Choose State..</option>
        //                             <option>Rajasthan</option>
        //                             <option>Hariyana</option>
        //                             <option>Uttar Pradesh</option>
        //                             <option>Madhya Pradesh</option>
        //                         </select>
        //                     </label>
        //                     <label>
        //                         Zip code
        //                         <input type="number" name='' placeholder='zip code' className=' bg-gray-100 ml-[5px] padding: 0.5rem 0.7rem' />
        //                     </label>
        //                 </div>
        //             </form>
        //         </div>
        //         <div className='basis-2/4'>
        //             <h3 className='mt-[1rem] color:#2c3e50'>PAYMENT</h3>
        //             <form className='p-[1rem]'>
        //                 Full Name
        //                 <input type='text' name='' placeholder='Enter name' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 Email
        //                 <input type='text' name=' ' placeholder='Enter email ' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 Address
        //                 <input type='text' name=' ' placeholder='Enter address' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 City
        //                 <input type='text' name=' ' placeholder='Enter city' className='bg-gray-100 w-full outline-none padding: 0.5rem 0.7rem margin: 0.5rem 0' />
        //                 <div className='flex mt-[0.5rem]'>
        //                     <label>
        //                         State
        //                         <select className='padding: 0.5rem 0.7rem'>
        //                             <option>Choose State..</option>
        //                             <option>Rajasthan</option>
        //                             <option>Hariyana</option>
        //                             <option>Uttar Pradesh</option>
        //                             <option>Madhya Pradesh</option>
        //                         </select>
        //                     </label>
        //                     <label>
        //                         Zip code
        //                         <input type="number" name='' placeholder='zip code' className=' bg-gray-100 ml-[5px] padding: 0.5rem 0.7rem' />
        //                     </label>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </header>


        // <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        //     <head>
        //         <title>Create Next App</title>
        //     </head>
        //     <main className=" flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        //         <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        //             <div className="w-2/5 p-5">

        //             </div>
        //             <div className="w-3/5 text-white rounded-tr-2xl round-br-2xl py-36 px-12">
        //                 <div className="flex justify-center items-center p-[26px] min-h-[100hv] pb-[70px] ">
        //                     <form action='' className=" w-[700px] bg-white ">
        //                         <div className="row">
        //                             <div className="col">
        //                                 <h3 className="tille">billing address</h3>
        //                                 <div className="inputBox">
        //                                     <span>full name :</span>
        //                                     <input type="text" placeholder="john deo" />
        //                                 </div>
        //                                 <div className="inputBox">
        //                                     <span>email :</span>
        //                                     <input type="email" placeholder="example@example.com" />
        //                                 </div>
        //                                 <div className="inputBox">
        //                                     <span>address :</span>
        //                                     <input type="text" placeholder="room - streat - locality" />
        //                                 </div>
        //                                 <div className="inputBox">
        //                                     <span>city :</span>
        //                                     <input type="text" placeholder="Ho Chi Minh" />
        //                                 </div>
        //                                 <div className="flex">
        //                                     <div className="inputBox">
        //                                         <span>state :</span>
        //                                         <input type="text" placeholder="Viet Nam" />
        //                                     </div>
        //                                     <div className="inputBox">
        //                                         <span>dentification :</span>
        //                                         <input type="text" placeholder="123456778" />
        //                                     </div>
        //                                 </div>

        //                             </div>
        //                         </div>
        //                     </form >
        //                 </div >
        //             </div>
        //         </div>
        //     </main>
        // </div>
        <div className="min-w-screen min-h-screen bg-gray-50 py-5">
            <div className="px-5">
                <div className="mb-2">
                    <a href="#" className="focus:outline-none hover:underline text-gray-500 text-sm"><i className="mdi mdi-arrow-left text-gray-400"></i>Back</a>
                </div>
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">PAYMENT.</h1>
                </div>
                <div className="mb-5 text-gray-400">
                    <a href="#" className="focus:outline-none hover:underline text-gray-500">Home</a> / <span className="text-gray-600">Payment</span>
                </div>
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="Homepage.png" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase text-gray-600">Cao Anh Tri.</h6>
                                        <p className="text-gray-400">x 1</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600 text-xl">$210</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="Homepage2.jpeg" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase text-gray-600">Cao Viet Thang.</h6>
                                        <p className="text-gray-400">x 1</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600 text-xl">$210</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$190.91</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Taxes (GST)</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$19.09</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">AUD</span> <span className="font-semibold">$210.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-5/12">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                {/* <div className="w-full flex mb-3 items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Contact</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span>Scott Windon</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Billing Address</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span>123 George Street, Sydney, NSW 2000 Australia</span>
                                    </div>
                                </div> */}
                                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Jane" />
                                            <p className="text-red text-xs italic">Please fill out this field.</p>
                                        </div>
                                        <div className="md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Last Name
                                            </label>
                                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="-mx-3 md:flex mb-6">
                                    <div className="md:w-full px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                                            Password
                                        </label>
                                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="password" placeholder="******************" />
                                        <p className="text-grey-dark text-xs italic">Make it as long and as crazy as you'd like</p>
                                    </div>
                                </div>
                                </div>
        
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    <div className="w-full p-3 border-b border-gray-200">
                                        <div className="mb-5">
                                            <label htmlFor="type1" className="flex items-center cursor-pointer">
                                                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                                                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" />
                                            </label>
                                            <div>
                                                <div className="mb-3">
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                                    <div>
                                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                                    <div>
                                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 -mx-2 flex items-end">
                                                    <div className="px-2 w-1/4">
                                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                                        <div>
                                                            <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                                                <option value="01">01 - January</option>
                                                                <option value="02">02 - February</option>
                                                                <option value="03">03 - March</option>
                                                                <option value="04">04 - April</option>
                                                                <option value="05">05 - May</option>
                                                                <option value="06">06 - June</option>
                                                                <option value="07">07 - July</option>
                                                                <option value="08">08 - August</option>
                                                                <option value="09">09 - September</option>
                                                                <option value="10">10 - October</option>
                                                                <option value="11">11 - November</option>
                                                                <option value="12">12 - December</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="px-2 w-1/4">
                                                        <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                                            <option value="2020">2020</option>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>
                                                            <option value="2023">2023</option>
                                                            <option value="2024">2024</option>
                                                            <option value="2025">2025</option>
                                                            <option value="2026">2026</option>
                                                            <option value="2027">2027</option>
                                                            <option value="2028">2028</option>
                                                            <option value="2029">2029</option>
                                                        </select>
                                                    </div>
                                                    <div className="px-2 w-1/4">
                                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                                        <div>
                                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full p-3">
                                            <label htmlFor="type2" className="flex items-center cursor-pointer">
                                                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
