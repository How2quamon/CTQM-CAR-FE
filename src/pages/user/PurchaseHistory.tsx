import React, { useEffect, useState } from 'react';
import useTitle from "src/hooks/useTitle";
import { Avatar, Card, notification, Spin } from 'antd';

import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import SideMenu from './SideMenu';
import { Link, useParams } from 'react-router-dom';
import { ctqmService } from '../../services/ctqm.services';
import { CustomerOrderDTO } from '@share/dtos/service-proxies-dtos';

const { Meta } = Card;

const PurchaseHistory: React.FC = () => {
    useTitle("Lịch sử mua hàng");

    const { customerId } = useParams();
    const [listOrders, setListOrders] = useState<CustomerOrderDTO[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const imagePath = "https://res.cloudinary.com/dbz9e4cwk/image/upload/v1692201767/product/";
    useEffect(() => {
        getListOrder();
    }, []);

    const getListOrder = () => {
        setIsLoading(true);
        ctqmService.orderApi
            .getCustomerOrder(customerId as string)
            .then((response) => {
                setListOrders(response);
                // console.log((response));
            })
            .catch(({ error }) => {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description:
                        error?.message ?? "Lỗi trong quá trình xử lý, vui lòng thử lại!",
                    placement: "bottomRight",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // if (!listOrders) {
    //     return <Spin size="large" className="flex justify-center items-center " />;
    // }

    return (
        <React.Fragment>
            <NavBar />
            <div className="min-h-screen bg-slate-700 leading-normal overflow-auto lg:overflow-auto">
                <div className='flex flex-col flex-1 md:p-0 md:mx-32 '>
                    <section className="mx-15 grid grid-cols-4 gap-6 bg-white">
                        <div className="">
                            <SideMenu />
                        </div>
                        <div className="col-span-3">
                            <div className='px-0 md:px-10 md:mr-7 md:my-20 content-center transition-all flex flex-col'>
                                <h1 className='mt-15 mb-7 text-3xl font-bold'>My Purchase History</h1>
                                {listOrders.length > 0 ? (
                                    listOrders.map((order, index) => (
                                        <div className='my-4 mx-5 flex flex-col flex-wrap gap-5'>
                                            <Card
                                                title={order.carModel}
                                                key={index} loading={loading}
                                                hoverable
                                                style={{ width: '100%' }}
                                                extra={<Link to={`/products-details/${order.carName}`} target="_blank">View</Link>}
                                            >
                                                <Meta
                                                    avatar={<Avatar size={100} shape="square" src={imagePath + order.carName + '/' + order.image1?.trim()} />}
                                                    title={order.carName}
                                                    description={order.amount} />
                                                <p className='mt-2 flex justify-end text-xl font-bold'>{order.totalPrice}</p>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <Spin size="large" />
                                )}
                            </div>
                        </div>
                    </section>
                </div>

            </div>
            <Footer />
        </React.Fragment>
    )
}

export default PurchaseHistory;