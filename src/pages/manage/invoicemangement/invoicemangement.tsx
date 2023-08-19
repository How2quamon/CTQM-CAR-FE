import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import { OrderDTO } from "@share/dtos/service-proxies-dtos";
import {
    Button,
    Card,
    Dropdown,
    Menu,
    Popconfirm,
    Table,
    message,
    notification
} from "antd";
import modal from "antd/es/modal";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { showNotificationError } from "src/utils/notification";
import { ctqmService } from "../../../services/ctqm.services";
import { columns } from "./component/columns";

const title = "Order Management";

export default function Invoicemangement() {
  useTitle("Invoicemangement");
  const [ListOrders, setListOrders] = useState<OrderDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getListOrder();
  }, []);

  const getListOrder = () => {
    setIsLoading(true);
    ctqmService.orderApi
      .getAllOrder()
      .then((response) => {
        setListOrders(response);
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Can't get your Order!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDelete = async (orderId: string) => {
    modal.confirm({
      title: "Xác nhận xóa!",
      async onOk() {
        try {
          setIsLoading(true);
          await ctqmService.orderApi.deleteOrderWithId(orderId);
          handleDeleteSuccess();
        } catch (error) {
          handleDeleteFailed(error);
        } finally {
          setIsLoading(false);
        }
      },
    });
  };
  const handleDeleteSuccess = () => {
    message.success("Xóa thành công");
    getListOrder();
  };

  const handleDeleteFailed = (error: any) => {
    showNotificationError(error);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Card title="Order List">
        <div className="h-screen bg-gray-100 pt-[40px] mt-[-20px]">
          <Table
            scroll={{ x: 1500 }}
            dataSource={ListOrders}
            pagination={false}
            columns={[
              {
                title: "",
                width: 50,
                dataIndex: "action",
                key: "action",
                render(item: string, order: any) {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu>
                          <Link to={`/updateOrder/${order.orderId}`}>
                            <Menu.Item>
                              <div className="flex gap-3">
                                <EditOutlined rev={undefined} />
                                <p>Update</p>
                              </div>
                            </Menu.Item>
                          </Link>
                          <Menu.Item>
                            <Popconfirm
                              title="Delete order!"
                              description="Are you sure you want to delete this product?"
                              onConfirm={() => handleDelete(order.orderId)}
                              okText="Yes"
                              cancelText="No"
                              className="flex justify-start items-center gap-3"
                            >
                              <DeleteOutlined rev={undefined} />
                              <p>Delete</p>
                            </Popconfirm>
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button icon={<EllipsisOutlined rev={undefined} />} />
                    </Dropdown>
                  );
                },
              },
            ].concat(columns as [])}
            loading={loading}
          />
        </div>
        <Footer />
      </Card>
    </React.Fragment>
  );
}
