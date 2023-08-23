import { Link, useParams } from "react-router-dom";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
  notification,
} from "antd";
import useTitle from "../../hooks/useTitle";
import { ctqmService } from "../../services/ctqm.services";
import {
  CartDetailDTO,
  CustomerCartDTO,
} from "@share/dtos/service-proxies-dtos";

export default function Payment() {
  useTitle("Payment");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [customerCartList, setCustomerCartList] = useState<CartDetailDTO[]>([]);
  const [amount, setAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(119.09);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState("paypal");
  const [loading, setIsLoading] = useState<boolean>(false);
  const { customerId } = useParams();
  const [getData, setGetData] = useState(false);
  const imagePath =
    "https://res.cloudinary.com/dbz9e4cwk/image/upload/v1692201767/product/";

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
  }, [getData]);

  const getListCart = () => {
    setIsLoading(true);
    ctqmService.cartApi
      .getCustomerCart(customerId as string)
      .then((response: CustomerCartDTO) => {
        setCustomerCartList(response.customerCarts!);
        setAmount(response.totalAmount!);
        const taxSum = taxTotal * response.totalAmount!;
        setTaxTotal(taxSum);
        setSubTotal(response.totalDiscount!);
        setTotalPrice(response.totalDiscount! + taxSum);
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Can't get your cart!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setGetData(true);
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
      console.log("paypal", customerId as string);
      ctqmService.orderApi
        .paypalPayment(customerId as string)
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
        .vnPayPayment(customerId as string)
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
          <div className="flex gap-2 mb-6 items-center">
            {/* <Link to={`/cart/${customerId}`} className="w-auto text-3xl font-bold text-black hover:underline hover:cursor-pointer">
              Back to cart
            </Link> */}
            <h1 className="text-3xl font-bold">Check out</h1>
            <Link to={`/cart/${customerId}`}>
              <div className="cursor-pointer flex gap-2 items-center text-blue-6 hover:text-blue-4">
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-4"
                >
                  <g
                    id="🔍-System-Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="ic_fluent_arrow_enter_24_filled"
                      fill="#1677ff"
                      fillRule="nonzero"
                    >
                      <path d="M21,4 C21.5128358,4 21.9355072,4.38604019 21.9932723,4.88337887 L22,5 L22,11.5 C22,13.3685634 20.5357224,14.8951264 18.6920352,14.9948211 L18.5,15 L5.415,15 L8.70710678,18.2928932 C9.06759074,18.6533772 9.09532028,19.2206082 8.79029539,19.6128994 L8.70710678,19.7071068 C8.34662282,20.0675907 7.77939176,20.0953203 7.38710056,19.7902954 L7.29289322,19.7071068 L2.29289322,14.7071068 C2.25749917,14.6717127 2.22531295,14.6343256 2.19633458,14.5953066 L2.12467117,14.4840621 L2.12467117,14.4840621 L2.07122549,14.371336 L2.07122549,14.371336 L2.03584514,14.265993 L2.03584514,14.265993 L2.0110178,14.1484669 L2.0110178,14.1484669 L2.00397748,14.0898018 L2.00397748,14.0898018 L2,14 L2.00278786,13.9247615 L2.00278786,13.9247615 L2.02024007,13.7992742 L2.02024007,13.7992742 L2.04973809,13.6878575 L2.04973809,13.6878575 L2.09367336,13.5767785 L2.09367336,13.5767785 L2.14599545,13.4792912 L2.14599545,13.4792912 L2.20970461,13.3871006 L2.20970461,13.3871006 L2.29289322,13.2928932 L2.29289322,13.2928932 L7.29289322,8.29289322 C7.68341751,7.90236893 8.31658249,7.90236893 8.70710678,8.29289322 C9.06759074,8.65337718 9.09532028,9.22060824 8.79029539,9.61289944 L8.70710678,9.70710678 L5.415,13 L18.5,13 C19.2796961,13 19.9204487,12.4051119 19.9931334,11.64446 L20,11.5 L20,5 C20,4.44771525 20.4477153,4 21,4 Z"></path>
                    </g>
                  </g>
                </svg>
                <p className="text-[12px] mt-4 text-[#1677ff]">Back to cart</p>
              </div>
            </Link>
          </div>
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                {loading ? (
                  <Spin
                    size="large"
                    className="flex justify-center items-center"
                  />
                ) : customerCartList.length > 0 ? (
                  customerCartList.map((cart) => (
                    <div
                      className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6"
                      key={cart.carId}
                    >
                      <div className="w-full flex items-center">
                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                          <img
                            src={
                              imagePath +
                              cart.carName +
                              "/" +
                              cart.image1?.trim()
                            }
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-semibold uppercase ">
                            {cart.carName}
                          </h6>
                          <p className="">x {cart.amount}</p>
                        </div>
                        <div>
                          <span className="font-semibold  text-xl">
                            ${cart.price}
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
                      <span className="">Amounts</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">{amount}</span>
                    </div>
                  </div>
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
                          className="px-20 py-3 rounded bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold h-auto"
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
