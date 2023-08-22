import {
  ArrowLeftOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { CarDTO } from "@share/dtos/service-proxies-dtos";
import { Button, Card, Form, Input, Select, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { ctqmService } from "../../../../services/ctqm.services";

export default function UpdateCar() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { carId } = useParams();
  const [getData, setGetData] = useState(false);
  const [carInfo, setCarInfo] = useState<CarDTO | null>(null);

  useEffect(() => {
    getCarDetail();
  }, [getData]);

  const getCarDetail = () => {
    setIsLoading(true);
    ctqmService.carApi
      .getCarWithId(carId as string)
      .then((response: any) => {
        setCarInfo(response);
        console.log("WOEIRJ", response);
      })
      .catch((error: any) => {
        notification.error({
          message: "An error occurred",
          description:
            error?.message ?? "Error in processing, please try again!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setGetData(true);
        setIsLoading(false);
      });
  };

  const onFinish = (values: CarDTO) => {
    console.log("Success:", values);
    setIsLoading(true);
    const updateCarInfo: CarDTO = {
      carId: values.carId,
      carName: values.carName,
      carEngine: values.carEngine,
      carClass: values.carClass,
      carModel: values.carModel,
      carAmount: values.carAmount,
      carPrice: values.carPrice,
      head1: values.head1,
      moTa: values.moTa,
      moTa2: values.moTa2,
      image1: carInfo?.image1,
      image2: carInfo?.image2,
      image3: carInfo?.image3,
      image4: carInfo?.image4,
    };
    ctqmService.carApi
      .updateCar(carId as string, updateCarInfo)
      .then((response) => {
        console.log("Result: ", response);
        notification.success({
          message: "Action Success",
          description: "Update car success!  ",
          placement: "bottomRight",
        });
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Update car Failed!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      {carInfo ? (
        <Spin spinning={loading}>
          <main className="w-full">
            <Card title={"Product Information"}>
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                  carId: carInfo?.carId,
                  carName: carInfo?.carName,
                  carModel: carInfo?.carModel,
                  carClass: carInfo?.carClass,
                  carEngine: carInfo?.carEngine,
                  carAmount: carInfo?.carAmount,
                  carPrice: carInfo?.carPrice,
                  head1: carInfo?.head1,
                  moTa: carInfo?.moTa,
                  moTa2: carInfo?.moTa2,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-x-3">
                  <Form.Item
                    name="carId"
                    label="Id"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input disabled allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carName"
                    label="Product Name"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter Product Name" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carModel"
                    label="Model"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Select placeholder="Enter Model" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carClass"
                    label="Class"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter class" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carEngine"
                    label="Engine"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter Engine" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carAmount"
                    label="Amount"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter Price" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="carPrice"
                    label="Price"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter Price" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="head1"
                    label="Head"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder="Enter Head" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="moTa"
                    label="Description"
                    className="font-semibold text-[#828282] w-full"
                    rules={[
                      { required: true, message: "Data cannot be blank!" },
                    ]}
                  >
                    <Input placeholder=" Enter Description" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="moTa2"
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
                <div className="flex justify-between items-center">
                  <Link to={"/product-management"}>
                    <Button
                      className="font-semibold"
                      icon={<ArrowLeftOutlined rev={undefined} />}
                      type="default"
                    >
                      Back
                    </Button>
                  </Link>
                  <div className="flex gap-3 col-span-2 justify-end items-center">
                    <Button
                      className="font-semibold"
                      icon={<CloseOutlined rev={undefined} />}
                      type="default"
                      danger
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      className=" text-white font-semibold"
                      htmlType="submit"
                      icon={<SaveOutlined rev={undefined} />}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            </Card>
          </main>
        </Spin>
      ) : null}
      <Footer />
    </>
  );
}
