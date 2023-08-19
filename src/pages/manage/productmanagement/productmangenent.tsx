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
import useTitle from "src/hooks/useTitle";
import NavBar from "src/layout/navigationBar";
import { showNotificationError } from "src/utils/notification";
import { ctqmService } from "../../../services/ctqm.services";
import { CarDTO } from "../../../share/dtos/service-proxies-dtos";
import { columns } from "./component/columns";

const title = "Product Management";

export default function ProductManagement() {
  useTitle(title);
  const [listCars, setListCars] = useState<CarDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getListCar();
  }, []);

  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getListCar();
  }, []);
  const getListCar = () => {
    setIsLoading(true);
    ctqmService.carApi
      .getAllCar()
      .then((response) => {
        setListCars(response);
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

  const handleDelete = async (carId: string) => {
    modal.confirm({
      title: "Confirm to delete!",
      onOk() {
        ctqmService.carApi
          .deleteCarWithId(carId as string)
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
    getListCar();
  };

  const handleDeleteFailed = (error: any) => {
    showNotificationError(error);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Card title="Products List">
        <div className="w-full flex flex-col border-top justify-end items-end">
          <Table
            scroll={{
              x: "200vh",
              y: 500,
            }}
            dataSource={listCars}
            pagination={false}
            className="w-full"
            columns={[
              {
                title: "",
                width: 50,
                dataIndex: "action",
                key: "action",
                render(item: string, car: any) {
                  return (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu>
                          <Link to={`/updateCar/${car.carId}`}>
                            <Menu.Item>
                              <div className="flex gap-3">
                                <EditOutlined rev={undefined} />
                                <p>Update</p>
                              </div>
                            </Menu.Item>
                          </Link>
                          <Menu.Item>
                            <Popconfirm
                              title="Delete product!"
                              description="Are you sure you want to delete this product?"
                              onConfirm={() => handleDelete(car.carId)}
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
    </React.Fragment>
  );
}
