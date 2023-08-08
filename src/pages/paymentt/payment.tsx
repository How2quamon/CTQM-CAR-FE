import { Link } from "react-router-dom";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from "antd";
import useTitle from "../../hooks/useTitle";
import { ctqmService } from "../../services/ctqm.services";
import layout from "antd/es/layout";
import { CarDTO, CartDTO } from "@share/dtos/service-proxies-dtos";

export default function Payment() {
  useTitle("Payment");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [customerCartList, setCustomerCartList] = useState<CartDTO[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(19.09);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState("paypal");
  const [carList, setCarList] = useState<CarDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [iframeContent, setIframeContent] = useState("");

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getListCart();
  }, []);

  const getListCart = () => {
    setIsLoading(true);
    ctqmService.cartApi
      .getCustomerCart("cbbf1eb6-ddb4-4577-82c4-56dd9e9fc7fd")
      .then((response) => {
        setCustomerCartList(response);
        console.log("CART", response);
        initValue();
        getCarData(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const initValue = () => {
    setSubTotal(0);
    setTaxTotal(19.09);
    setTotalPrice(0);
    setCarList([]);
    console.log("DITMEt");
  };

  const getCarData = (listCart: CartDTO[]) => {
    setIsLoading(true);
    listCart.forEach((cart) => {
      let price = cart.price! * cart.amount!;
      console.log("PRICE", price);
      setSubTotal(subTotal + price);
      setTotalPrice(taxTotal + subTotal + price);
      ctqmService.carApi
        .getCarWithId(cart.carId!)
        .then((rs) => {
          // Sao chép mảng hiện tại
          const newCarList = [...carList];
          // Thêm giá trị mới vào cuối mảng sao chép
          newCarList.push(rs);
          // Cập nhật state bằng mảng mới
          setCarList(newCarList);
          console.log("ASDASDQWEASD ", rs);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
    setPaymentMethods(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log(paymentMethods);
    console.log(customerCartList);
    setIsLoading(true);
    if (paymentMethods == "paypal") {
      console.log("paypal", "cbbf1eb6-ddb4-4577-82c4-56dd9e9fc7fd");
      ctqmService.orderApi
        .paypalPayment("cbbf1eb6-ddb4-4577-82c4-56dd9e9fc7fd")
        .then((rs) => {
          console.log("Paypal ", rs);
          if (rs.message == "redirect") {
            window.location.href = rs.url;
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (paymentMethods == "vnpay") {
      ctqmService.orderApi
        .vnPayPayment("cbbf1eb6-ddb4-4577-82c4-56dd9e9fc7fd")
        .then((rs) => {
          console.log("VNPay ", rs);
          if (rs.message == "redirect") {
            window.location.href = rs.url;
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <NavBar />
      <main>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold mb-[35px]">
            Check out
          </h1>
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                {carList.length > 0 ? (
                  carList.map((car) => (
                    <div
                      className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6"
                      key={car.carId}
                    >
                      <div className="w-full flex items-center">
                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                          <img src="Homepage.png" alt="" />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-semibold uppercase ">
                            {car.carName}
                          </h6>
                          <p className="">x 1</p>
                        </div>
                        <div>
                          <span className="font-semibold  text-xl">
                            ${car.carPrice}
                          </span>
                          <span className="font-semibold text-gray-600 text-sm">
                            .00
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[15px] font-semibold mt-2">
                    Nothing in your Cart
                  </p>
                )}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="-mx-2 flex items-end justify-end">
                    <div className="flex-grow px-2 lg:max-w-xs">
                      <label className=" font-semibold text-sm mb-2 ml-1">
                        Discount code
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="XXXXXX"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 ">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">${subTotal}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="">Taxes (GST)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">${taxTotal}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold  text-sm">AUD</span>{" "}
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  <Form
                    layout="vertical"
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <div className="w-full p-3 text-center">
                      <Radio.Group onChange={onChange} defaultValue="paypal">
                        <Radio.Button
                          value="paypal"
                          className="h-auto p-3 rounded"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            height="160"
                            alt="paypal payment"
                          />
                        </Radio.Button>
                        <Radio.Button
                          value="vnpay"
                          className="h-auto p-3 rounded mt-5"
                        >
                          <img
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                            height="160"
                            alt="vnpay payment"
                          />
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    <Row justify="center">
                      <Col>
                        <Button
                          className="bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg font-semibold"
                          type="primary"
                          htmlType="submit"
                        >
                          PAY NOW
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
