import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
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
import usePopup from "src/hooks/usePopup";
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { showNotificationError } from "src/utils/notification";
import { ctqmService } from "../../../services/ctqm.services";
import { CustomerDTO } from "../../../share/dtos/service-proxies-dtos";
import { columns } from "./columns";

const title = "Customer Management";

export default function CustomerManagement() {
  useTitle(title);
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getCustomers();
  }, []);

  const getCustomers = () => {
    setIsLoading(true);
    ctqmService.customerApi
      .getAllCustomer()
      .then((response) => {
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
      title: "Confirm to delete?",
      async onOk() {
        try {
          setIsLoading(true);
          await ctqmService.customerApi.deleteCustomerWithId(customerId);
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
    message.success("Deleted successfully!");
    getCustomers();
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
                render(item: string, customer: any) {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu>
                          <Link to={`/updateCustomer/${customer.customerId}`}>
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
                              onConfirm={() =>
                                handleDelete(customer.customerId)
                              }
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
      </Card>
      <Footer />
    </React.Fragment>
  );
}
