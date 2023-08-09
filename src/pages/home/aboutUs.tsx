import { Button, Form, Input } from 'antd';
import Footer from "src/layout/Footer";
import React from 'react';
import { useState } from 'react';
import jsonp from 'jsonp';
import useTitle from 'src/hooks/useTitle';
import NavBar from 'src/layout/navigationBar';
import { MailOutlined } from '@ant-design/icons';

const AboutUs: React.FC = () => {
    useTitle("Subscribe to our website");

    const [email, setEmail] = useState('');
    const [loading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const onFinish = (e: any) => {
        e.preventDefault();
        const url = 'https://gmail.us8.list-manage.com/subscribe/post-json?u=e0b08f64193468684ada6b111&amp;id=fa8f616500&amp;f_id=005d71e0f0&c=?';
        jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_, data) => {
            const { msg, result } = data
            
            alert(msg);
        });
    };

    return (
        <React.Fragment>
            <NavBar />
            <main className='h-full overflow-y-hidden'>
                <div className="flex flex-col justify-center  overflow-y-hidden">
                    <div id="wrapper" className="grid grid-cols-1 xl:grid-cols-2 xl:h-screen">
                        <div id="col-1" className="bg-blue-900">
                            <img
                                src='https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
                                className="object-cover h-full w-full"
                            />

                        </div>
                        <div id="col-2" className="px-3 md:px-20 xl:py-64 xl:px-12">

                            <div id="cards" className="rounded-lg flex border drop-shadow py-5 px-6 md:py-8 md:px-16 -mt-6 bg-white xl:-ml-24 xl:pl-8 xl:rounded-xl">
                                <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                                {/* Mailchimp subscribe  */}
                                <Form
                                    form={form}
                                    layout="inline"
                                    size="large"
                                    className='pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4'
                                    onFinish={onFinish}
                                >
                                    <Form.Item className="w-[260px] mb-5"
                                        name="EMAIL"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your email!"
                                            },
                                            {
                                                type: "email",
                                                message: "The input is not valid E-mail!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="your@email.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button 
                                        className="hover:border-2 hover:border-slate-900 hover:bg-white hover:text-black-500 !rounded-full h-10 !px-10 !py-2 font-semibold bg-slate-900 text-white flex items-center" 
                                        htmlType="submit"
                                        loading={loading}
                                        >
                                            Subscribe
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                            <div id="cards" className="rounded-lg flex items-center border drop-shadow-md py-5 px-6 md:py-8 md:px-16 mt-6 md:mt-12 bg-white xl:pl-8 xl:rounded-xl">
                                <MailOutlined rev={undefined} className='text-base md:text-3xl' />
                                <p className="pl-4 md:pl-12 text-base font-semibold md:text-xl">Get update on new arrivals along with special offers when you sign up with us.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default AboutUs;