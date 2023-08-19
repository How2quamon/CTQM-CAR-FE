import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, notification, Select, Spin } from "antd";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { ctqmService } from "../../../services/ctqm.services";
import { CustomerDTO } from "../../../share/dtos/service-proxies-dtos";

const { Option } = Select;

export default function UpdateCustomer() {
  useTitle("Update Customer");
  const { customerId = '' } = useParams();
  const [form] = Form.useForm();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [customerData, setCustomerData] = useState<CustomerDTO | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ctqmService.customerApi
      .getCustomerWithId(customerId)
      .then((response) => {
        setCustomerData(response);
        form.setFieldsValue({
          customerId: response.customerId || '', // Nếu response.customerId undefined thì gán ''
          customerName: response.customerName || '',
          customerPhone: response.customerPhone || '',
          customerAddress: response.customerAddress || '',
          customerDate: dayjs(response.customerDate) || '',
          customerLicense: response.customerLicense || '',
          customerEmail: response.customerEmail || '',
        })
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Cannot get customer data!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [customerId, form]);

  const handleFormSubmit = async (values: CustomerDTO) => {
    try {
      setIsLoading(true);
      const validatedValues = await form.validateFields(); // ...
      console.log('Submitting form with values:', validatedValues);
      await ctqmService.customerApi.updateCustomerInfo(customerId, validatedValues);
      setUpdateSuccess(true);
      notification.success({
        message: "Update successfully!",
        description: "Customer information has been updated.",
        placement: "bottomRight",
    });
    } catch (error) {
      console.error('Error during form submission:', error);
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
          <Card title={"Product Information"}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <div className="grid grid-cols-2 items-start justify-start gap-x-3">
                <Form.Item
                  name={"customerId"}
                  label="ID"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input disabled allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerName"}
                  label="Customer Name"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Customer Name" allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerPhone"}
                  label="Phone Number"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter phone number" allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerEmail"}
                  label="Email"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter email" allowClear />
                </Form.Item>
                <Form.Item
                  name={"customerAddress"}
                  label="Address"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter address" allowClear />
                </Form.Item>
                <Form.Item
                  name="customerDate"
                  label="Date of Birth"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: 'Data cannot be blank!' }
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="customerLicense"
                  label="License"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: 'Please select license!' }
                  ]}
                >
                  <Select placeholder="Select your license"
                  >
                    <Option value="B1">B1</Option>
                    <Option value="B2">B2</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                    <Option value="E">E</Option>
                    <Option value="F">F</Option>
                    <Option value="FB2">FB2</Option>
                    <Option value="FC">FC</Option>
                    <Option value="FD">FD</Option>
                    <Option value="FE">FE</Option>
                  </Select>
                </Form.Item>
              </div>
              {/* Footer*/}
              {updateSuccess && (
                <div className="text-green-500 font-semibold mt-2">
                  Change to public
                </div>
              )}
              <div className="flex gap-3 mt-6 col-span-2 justify-end items-center">
                <Button
                  className="font-semibold"
                  icon={<CloseOutlined rev={undefined} />}
                  type="default"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  ghost
                  className=" text-white font-semibold"
                  //   onClick={() => setIsContinue(false)}
                  htmlType="submit"
                  icon={<SaveOutlined rev={undefined} />}
                >
                  Save
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