import React from 'react';
import useTitle from "src/hooks/useTitle";
import { Avatar, Card } from 'antd';

import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import SideMenu from './SideMenu';

const { Meta } = Card;

const PurchaseHistory: React.FC = () => {
    useTitle("Lịch sử mua hàng");
  return(
    <React.Fragment>
            <NavBar/>
            <div className="min-h-screen bg-slate-700 leading-normal overflow-auto lg:overflow-auto">
            <div className='flex flex-col flex-1 md:p-0 md:mx-32 '>
                <section className="mx-15 grid grid-cols-4 gap-6 bg-white">
                    <div className="">
                        <SideMenu/>
                    </div>
                    <div className="col-span-3">
                      <div className='px-0 md:px-10 md:mr-7 md:my-20 content-center transition-all flex flex-col'>
                        <h1 className='mt-15 mb-7 text-3xl font-bold'>My Purchase History</h1>
                        <div className='my-4 mx-5 flex flex-col flex-wrap gap-5'>
                                <Card
                                    hoverable
                                    style={{ width: '100%' }}
                                    extra={<a href="#">View</a>}
                                >
                                    <Meta 
                                    avatar={<Avatar size={100} shape="square" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />} 
                                    title="Mercedes-AMG G63 2019" 
                                    description="Emerald Green metallic" />
                                    <p className='mt-2 flex justify-end text-xl font-bold'>12.000.000.000 VND</p>
                                </Card>
                                <Card
                                    hoverable
                                    style={{ width: '100%' }}
                                    extra={<a href="#">View</a>}
                                >
                                    <Meta 
                                    avatar={<Avatar size={100} shape="square" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />} 
                                    title="Mercedes-AMG G63 2019" 
                                    description="Emerald Green metallic" />
                                    <p className='mt-2 flex justify-end text-xl font-bold'>12.000.000.000 VND</p>
                                </Card>
                                <Card
                                    hoverable
                                    style={{ width: '100%' }}
                                    extra={<a href="#">View</a>}
                                >
                                    <Meta 
                                    avatar={<Avatar size={100} shape="square" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />} 
                                    title="Mercedes-AMG G63 2019" 
                                    description="Emerald Green metallic" />
                                    <p className='mt-2 flex justify-end text-xl font-bold'>12.000.000.000 VND</p>
                                </Card>
                        </div>
                      </div>
                    </div>
                   
                </section>
            </div>
            </div> 
            <Footer/>   
        </React.Fragment>
  )
}

export default PurchaseHistory;