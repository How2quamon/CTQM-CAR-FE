import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Spin } from "antd";
import React from "react";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";

export default function UpdateCar() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  return (
    <>
      <NavBar />
      <Spin spinning={loading}>
        <main className="w-full">
          <Card title={"Product Information"}>
            <Form form={form} layout="vertical">
              <div className="grid grid-cols-2 items-start justify-start gap-x-3">
                <Form.Item
                  name={"carId"}
                  label="Id"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input disabled allowClear />
                </Form.Item>
                <Form.Item
                  name={"carName"}
                  label="Product Name"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Product Name" allowClear />
                </Form.Item>
                <Form.Item
                  name={"carModel"}
                  label="Model"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Select placeholder="Enter Model" allowClear />
                </Form.Item>  
                <Form.Item
                  name={"carClass"}
                  label="Class"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter class" allowClear />
                </Form.Item>
                <Form.Item
                  name={"carEngine"}
                  label="Engine"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Engine" allowClear />
                </Form.Item>
                <Form.Item
                  name={"carPrice"}
                  label="Price"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Price" allowClear />
                </Form.Item>
                <Form.Item
                  name={"head1"}
                  label="Head"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder="Enter Head" allowClear />
                </Form.Item>
                <Form.Item
                  name={"moTa"}
                  label="Description"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder=" Enter Description" allowClear />
                </Form.Item>
                <Form.Item
                  name={"moTa2"}
                  label="Description 2"
                  className="font-semibold text-[#828282] w-full"
                  rules={[
                    { required: true, message: "Data cannot be blank!" },
                  ]}
                >
                  <Input placeholder=" Enter Description 2" allowClear />
                </Form.Item>
              </div>
              {/* Footer*/}
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
                  Save and Cancel
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
