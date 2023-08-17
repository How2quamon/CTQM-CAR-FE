import React, { ReactNode, useEffect, useState } from 'react';
import { Switch, Table, Button, Input, Popconfirm, Space, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import NavBar from "src/layout/navigationBar";
import Footer from "src/layout/Footer";
import Column from 'antd/es/table/Column';
import { ctqmService } from "../../../services/ctqm.services";
import useTitle from 'src/hooks/useTitle';
import { OrderDTO, UpdateOrderDTO,  } from "@share/dtos/service-proxies-dtos";
import { useParams } from 'react-router-dom';
import { columns } from "./component/columnsinvoice";


export default function Invoicemangement() {
    useTitle("Invoicemangement");
    const [ListOrder, setListOrder] = useState(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [getCustomerOrder, setgetCustomerOrder] = useState<OrderDTO[]>([]);
    const [getData, setGetData] = useState(false);
    const { customerId } = useParams();

    // useEffect(() => {
    //     // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    //     getListOrder();
    //   }, []);
    
    //   const getListOrder = () => {
    //     setIsLoading(true);
    //     ctqmService.orderApi
    //       .getOrderWithId()
    //       .then((response) => {
    //         setListCustomerOrder(response);
    //         console.log("Order", response);
    //       })
    //       .catch(({ error }) => {
    //         notification.error({
    //           message: "Action Failed",
    //           description: error?.message ?? "Can't get your cart!",
    //           placement: "bottomRight",
    //         })
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //       });
    //   };

    return (
        <React.Fragment>
            <NavBar />
            <div className="h-screen bg-gray-100 pt-20 mt-[-20px]">
                <h1 className="mb-8 text-center text-2xl font-bold">Invoice</h1>
                <Table
                    // columns={columns}
                    scroll={{ x: 1500 }}
                    sticky />
                {/* <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                /> */}
            </div>
            <Footer />
        </React.Fragment>
    );
};


