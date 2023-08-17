/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, Pagination, Popconfirm, Table, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import useTitle from "src/hooks/useTitle";
import NavBar from "src/layout/navigationBar";
import { showNotificationError } from "src/utils/notification";
import { ctqmService } from "../../../services/ctqm.services";
import { CarDTO } from "../../../share/dtos/service-proxies-dtos";
import { columns } from "./component/columns";
import modal from "antd/es/modal";

const title = "Product Management";

export default function ProductManagement() {
  useTitle(title);
  const [data, setData] = useState<any>({
    items: [],
    totalCount: 0,
  });
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

  //tôi muốn gọi API xóa sản phẩm với deleteCarWithId và bắt 
  //sự kiện xóa sản phẩm thành công và thất bại
  const handleDelete = async (carId: string) => {
    modal.confirm({
      title: "Xác nhận xóa!",
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


 //-----Xóa thành công-----
  const handleDeleteSuccess = () => {
    message.success("Xóa thành công");
    getListCar();
  };
  //-----Xóa thất bại-----
  const handleDeleteFailed = (error: any) => {
    showNotificationError(error);
  };
  //-----Phân trang-----

  // const handleOnChangePage = (pageNumber: any) => {
  //   setIsLoading(true);
  //   ctqmService.carApi
  //     .getAllCar(pageNumber)
  //     .then((response) => {
  //       setData(response);
  //     })
  //     .catch(({ error }) => {
  //       notification.error({
  //         message: "An error occurred",
  //         description:
  //           error?.message ?? "Error in processing, please try again!",
  //         placement: "bottomRight",
  //       });
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };


  //-----Mở popup Cập nhật-----
  const handleShowUpdatePopup = (id: any) => {

  }
  return (
    <React.Fragment>
      <NavBar />
      {/* List */}
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
            columns={
              columns.concat([
                {
                  title: "",
                  width: 100,
                  dataIndex: "action",
                  key: "action",
                  render( carId : string) {
                    return (
                      <Dropdown
                        placement="bottomRight"
                        overlay={
                          <Menu>
                            <Menu.Item onClick={() => handleShowUpdatePopup(carId)} className="flex justify-start items-center gap-3"><EditOutlined rev={undefined} /><p>Cập nhật</p></Menu.Item>
                            <Menu.Item>

                              <Popconfirm
                                title="Xóa vai trò"
                                description="Bạn có chắc chắn xóa vai trò này không?"
                                onConfirm={() => handleDelete(carId)}
                                okText="Có"
                                cancelText="Không"
                                className="flex justify-start items-center gap-3"
                              >
                                
                               <DeleteOutlined rev={undefined} /><a>Xoá</a>
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
              ]) as []
            }
            loading={loading}
          />
          <Pagination total={data.totalCount}  className="m-2" />
        </div>
      </Card>
    </React.Fragment>
  );
}
