import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Menu,
  Pagination,
  Popconfirm,
  Table,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import useTitle from "src/hooks/useTitle";
import NavBar from "src/layout/navigationBar";
import { showNotificationError } from "src/utils/notification";
import { ctqmService } from "../../../services/ctqm.services";
import { CustomerDTO } from "../../../share/dtos/service-proxies-dtos";
import { columns } from "./columns";
import modal from "antd/es/modal";
import usePopup from "src/hooks/usePopup";
import AddResourcePlanPopup from "./Update";
import { Link } from "react-router-dom";
import Footer from "src/layout/Footer";
import dayjs from 'dayjs';

// eslint-disable-next-line react-hooks/rules-of-hooks

const title = "Customer Management";

export default function ProductManagement() {
  useTitle(title);
  const [data, setData] = useState<any>({
    items: [],
    totalCount: 0,
  });
  const {
    show: showUpdatePopup,
    hidden: hiddenUpdatePopup,
    popupComponent: updatePopup,
  } = usePopup();
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getCustomer();
  }, []);
  const getCustomer = () => {
    setIsLoading(true);
    ctqmService.customerApi
      .getAllCustomer()
      .then((response) => {
        response.customerDate = dayjs(response.customerDate) || '',
        setCustomers(response);
      })
      .catch(({ error }) => {
        notification.error({
          message: "An error occurred",
          description:
            error?.message ?? "Error in processing, please try again!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (customerId: string) => {
    modal.confirm({
      title: "Are you sure you want to delete this customer?",
      onOk() {
        ctqmService.customerApi
          .deleteCustomerWithId(customerId as string)
          .then(() => {
            handleDeleteSuccess();
          })
          .catch(({ error }) => {
            handleDeleteFailed(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
    });
  };

  const handleDeleteSuccess = () => {
    message.success("Deleted successfully!");
    getCustomer();
  };

  const handleDeleteFailed = (error: any) => {
    showNotificationError(error);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Card title="Customer List">
        <div className="w-full flex flex-col border-top justify-end items-end">
          <Table
            scroll={{
              x: "200vh",
              y: 500,
            }}
            dataSource={customers}
            pagination={false}
            className="w-full"
            columns={[
                {
                  title: "",
                  width: 50,
                  dataIndex: "action",
                  key: "action",
                  render(customerId: string) {
                    return (
                      <Dropdown
                        placement="bottomRight"
                        overlay={
                          <Menu>
                            <Link to={`/updateCustomer/${customerId}`}>
                              <Menu.Item>
                                <div className="flex gap-3">
                                <EditOutlined rev={undefined} />
                                <p>Update</p>
                                </div>
                              </Menu.Item>
                            </Link>
                            <Menu.Item>
                              <Popconfirm
                                title="Delete customer?"
                                description="Are you sure you want to delete this customer?"
                                onConfirm={() => handleDelete(customerId)}
                                okText={<span className="text-black">Yes</span>}
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
          <Pagination total={data.totalCount} className="m-2" />
        </div>
      </Card>
      <Footer/>
    </React.Fragment>
  );
}