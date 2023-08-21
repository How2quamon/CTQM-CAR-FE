import {
  ArrowLeftOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { ctqmService } from "../../../../services/ctqm.services";
import { OrderDTO } from "../../../../share/dtos/service-proxies-dtos";

export default function UpdateOrder() {
  useTitle("UpdateOrder");
  const { orderId = "" } = useParams();
  const [form] = Form.useForm();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderDTO | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ctqmService.orderApi
      .getOrderWithId(orderId)
      .then((response) => {
        setOrderData(response);
        form.setFieldsValue({
          orderId: response.orderId || "", // Nếu response.orderId undefined thì gán ''
          carID: response.carId || "",
          customerId: response.customerId || "",
          orderDate: response.orderDate || "",
          orderStatus: response.orderStatus || "",
          amount: response.amount || 0, // Hoặc giá trị mặc định khác
          totalPrice: response.totalPrice || 0, // Hiển thị thông tin hiện tại trong form
        });
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
      console.log("Submitting form with values:", validatedValues);
      await ctqmService.orderApi.updateOrder(orderId, validatedValues);
      setUpdateSuccess(true);
      notification.success({
        message: "Update successfully!",
        description: "Customer information has been updated.",
        placement: "bottomRight",
    });
    } catch (error) {
      console.error("Error during form submission:", error);
      notification.error({
        message: "Action Failed",
        description: "Failed to update customer information.",
        placement: "bottomRight",
      });
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
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-x-3">
                <Form.Item
                  name={"orderId"}
                  label="Order ID"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input disabled allowClear />
                </Form.Item>
                <Form.Item
                  name={"carID"}
                  label="Car ID"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter carId" allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerId"}
                  label="Customer Id"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter customerId" allowClear />
                </Form.Item>

                <Form.Item
                  name={"orderDate"}
                  label="Date of payment"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter Date" allowClear />
                </Form.Item>

                <Form.Item
                  name={"orderStatus"}
                  label="Payment methods"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter Payment methods" allowClear />
                </Form.Item>
                <Form.Item
                  name={"amount"}
                  label="Amount"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter amount" allowClear />
                </Form.Item>
                <Form.Item
                  name={"totalPrice"}
                  label="Total Price"
                  className="font-semibold text-[#828282] w-full"
                  rules={[{ required: true, message: "Data cannot be blank!" }]}
                >
                  <Input placeholder="Enter total price" allowClear />
                </Form.Item>
              </div>
              {/* Footer*/}
              {updateSuccess && (
                <div className="text-green-500 font-semibold mt-2">
                  Change to public
                </div>
              )}
              <div className="flex justify-between items-center">
                <Link to={"/invoicemangement"}>
                  <Button
                    className="font-semibold"
                    icon={<ArrowLeftOutlined rev={undefined} />}
                    type="default"
                  >
                    Back
                  </Button>
                </Link>
                <div className="flex gap-3 col-span-2 justify-end items-center">
                  <Link to="/invoicemangement">
                    <Button
                      className="font-semibold"
                      icon={<CloseOutlined rev={undefined} />}
                      type="default"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    ghost
                    className=" text-white font-semibold"
                    htmlType="submit"
                    icon={<SaveOutlined rev={undefined} />}
                  >
                    save
                  </Button>
                </div>
              </div>
            </Form>
          </Card>
        </main>
      </Spin>
      <Footer />
    </>
  );
}
