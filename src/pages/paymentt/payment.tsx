import { Link } from 'react-router-dom';
import Footer from 'src/layout/Footer';
import NavBar from 'src/layout/navigationBar';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import useTitle from '../../hooks/useTitle';
import { ctqmService } from '../../services/ctqm.services';
import layout from 'antd/es/layout';
import { CartDTO } from '@share/dtos/service-proxies-dtos';

export default function Payment() {
    useTitle("Payment");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [customerCartList, setCustomerCartList] = useState<CartDTO[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    useEffect(() => {
        // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
        getListCart();
    }, []);

    const getListCart = () => {
        setIsLoading(true);
        ctqmService.cartApi
            .getCustomerCart("cbbf1eb6-ddb4-4577-82c4-56dd9e9fc7fd")
            .then((response) => {
                setCustomerCartList(response);
                console.log(response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const getCarData = (id: string) => {
        
    }


    function onFinish(values: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <React.Fragment><NavBar /><main>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-[35px]">Check out</h1>
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="Homepage.png" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase ">Cao Anh Tri</h6>
                                        <p className="">x 1</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold  text-xl">$210</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="Homepage2.jpeg" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase">Cao Viet Thang</h6>
                                        <p >x 1</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold  text-xl">$210</span><span className="font-semibold  text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className=" font-semibold text-sm mb-2 ml-1">Discount code</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 ">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$190.91</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="">Taxes (GST)</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$19.09</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold  text-sm">AUD</span> <span className="font-semibold">$210.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-5/12">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                <Form
                                    layout="vertical"
                                    name="nest-messages"
                                    onFinish={onFinish}
                                    style={{ maxWidth: 600 }}
                                    validateMessages={validateMessages}
                                >
                                    <Form.Item name={['user', 'Name']} label="Name" rules={[{ required: true }]}
                                        className="mr-[100px]">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'Email']} label="Email" rules={[{ required: true }]}
                                        className=" mr-[100px]">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'CCCD/CMND']} label="CCCD/CMND" rules={[{ required: true }]}
                                        className=" mr-[100px]">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'Address']} label="Address" rules={[{ required: true }]}
                                        className=" mr-[100px]">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'Phone Number']} label="Phone Number" rules={[{ required: true }]}
                                        className=" mr-[100px]">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'Note']} label="Note" className='mr-[100px]'>
                                        <Input.TextArea />
                                    </Form.Item>

                                    <div className="w-full p-3 border-b border-gray-200">
                                        <div className="mb-5">
                                            <label htmlFor="type1" className="flex items-center cursor-pointer mb-[20px]">
                                                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1"/>
                                                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" alt='' />
                                            </label>
                                            <div >
                                                <Form.Item name={['user', 'Name on card']} label="Name on card" rules={[{ required: true }]}
                                                    className="mb-8 mr-[80px]">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name={['user', 'Card number']} label="Card number" rules={[{ required: true }]} className="mr-[80px]">
                                                    <Input />
                                                </Form.Item>
                                                <div className="mb-3 -mx-2 flex items-end">
                                                    <div className="px-2 w-1/4">
                                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 ">Expiration date</label>
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
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" alt='' />
                                            </label>
                                        </div>
                                    </div>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                                        <Button type="primary" htmlType="submit">
                                            PAY NOW
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main><Footer />
        </React.Fragment>
    );
};
