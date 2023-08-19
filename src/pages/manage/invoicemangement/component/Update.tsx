import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { ctqmService } from "../../../../services/ctqm.services"
import { OrderDTO } from "../../../../share/dtos/service-proxies-dtos"
import useTitle from "src/hooks/useTitle";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function UpdateOrder() {
  useTitle("UpdateOrder");
  const { orderId = '' } = useParams();
  const [form] = Form.useForm();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderDTO | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    //   getListOrder();
    // }, []);
    // const getListOrder = () => {
    setIsLoading(true);
    ctqmService.orderApi
      .getOrderWithId(orderId)
      .then((response) => {
        setOrderData(response);
        form.setFieldsValue({
          orderId: response.orderId || '', // Nếu response.orderId undefined thì gán ''
          carID: response.carId || '',
          customerId: response.customerId || '',
          orderDate: response.orderDate || '',
          orderStatus: response.orderStatus || '',
          amount: response.amount || 0, // Hoặc giá trị mặc định khác
          totalPrice: response.totalPrice || 0, // Hiển thị thông tin hiện tại trong form
        })
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
  }, [orderId, form]);

  const handleFormSubmit = async (values: OrderDTO) => {
    try {
      setIsLoading(true);
      const validatedValues = await form.validateFields(); // ...
      console.log('Submitting form with values:', validatedValues);
      await ctqmService.orderApi.updateOrder(orderId, validatedValues);
      setUpdateSuccess(true);
      alert("Update Successful: Order information has been updated.");
    } catch (error) {
      console.error('Error during form submission:', error);
      alert("Update Failed: Failed to update order information.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <Spin spinning={loading}>
        <main className="w-full">
          <Card title={"Order Information"}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}
            >
              <div className="grid grid-cols-2 items-start justify-start gap-x-3">
                <Form.Item
                  name={"orderId"}
                  label="Order ID"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input disabled allowClear />
                </Form.Item>
                <Form.Item
                  name={"carID"}
                  label="Car ID"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Product Name" allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerId"}
                  label="Customer Id"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Model" allowClear />
                </Form.Item>
                <Form.Item
                  name={"orderDate"}
                  label="Date of payment"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter class" allowClear />
                </Form.Item>
                <Form.Item
                  name={"orderStatus"}
                  label="Payment methods"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Engine" allowClear />
                </Form.Item>
                <Form.Item
                  name={"amount"}
                  label="Amount"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Price" allowClear />
                </Form.Item>
                <Form.Item
                  name={"totalPrice"}
                  label="Total Price"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Head" allowClear />
                </Form.Item>
              </div>
              {/* Footer*/}
              {updateSuccess && (
                <div className="text-green-500 font-semibold mt-2">
                  Change to public
                </div>
              )}
              <div className="flex gap-3 mt-6 col-span-2 justify-end items-center">
                <Link to="/invoicemangement">
                  <Button className="font-semibold"
                    icon={<CloseOutlined rev={undefined} />} type="default">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="primary"
                  ghost
                  className=" text-white font-semibold"
                  //   onClick={() => setIsContinue(false)}
                  // onClick={() => form.submit()}
                  htmlType="submit"
                  icon={<SaveOutlined rev={undefined} />}
                >
                  save
                </Button>
              </div>
            </Form>
          </Card>
        </main>
      </Spin>
      <Footer />
    </>
  );
}