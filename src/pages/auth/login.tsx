import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import logoDark from "../../logo/ctqm-logo-dark.svg";
import logoLight from "../../logo/ctqm-logo-2.png";
import { ctqmService } from "../../services/ctqm.services";
import { CustomerLoginDTO } from "@share/dtos/service-proxies-dtos";
import handleHttpStatusCode from "src/utils/handleHttpStatusCode";
import useTitle from "src/hooks/useTitle";
import NavBar from "src/layout/navigationBar";
import Footer from "src/layout/Footer";

export default function Login() {
  useTitle("Login");

  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => { }, []);
  const onFinish = (values: CustomerLoginDTO) => {
    // Xử lý dữ liệu đăng nhập khi form submit thành công
    setIsLoading(true);
    const currentToken = localStorage.getItem("CustomerName") != null ? localStorage.getItem("Token") : "";
    const loginValue: CustomerLoginDTO = {
      email: values.email,
      password: values.password,
      token: currentToken!,
      admin: false,
    };

    console.log(values);

    ctqmService.customerApi
      .loginAction(loginValue)
      .then((response) => {
        console.log(response);
        if (response.customerName != null && response.tokenPass != null) {
          localStorage.setItem("Token", response.tokenPass);
          localStorage.setItem("CustomerName", response.customerName);
          localStorage.setItem("CustomerId", response.customerId);
          console.log("SAVE TOKEN");
          navigate("/");
        }
        else {
          notification.error({
            message: "Password incorrect",
            description: "Account or password is not correct!  ",
            placement: "bottomRight",
          });
        }
      }).catch(({ error }) => {
        notification.error({
          message: "Có lỗi xảy ra",
          description: error?.message ?? "Account or password is not correct!  ",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <React.Fragment>
        {/* <div className="flex items-center md:justify-start px-4 py-1 md:py-5  bg-gray-100">
          <Link to="/">
            <img className="h-6" src={logoDark} alt="CTQM logo" />
          </Link>
        </div> */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <main className=" flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            <div className="w-3/5 p-[50px]">
              <div className="mt-5">
                <h2 className="text-3xl font-bold text-black-500 mb-2">
                  Sign in to Account
                </h2>
                <div className="border-2 w-10 border-black-500 inline-block"></div>
                <div className="flex justify-center my-5">
                  <p className="text-gray-400">Welcome to the car shop CTQM</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <Form
                  name="basic"
                  className="max-w-[600px]"
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  size="large"
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    className="w-[260px] mb-5"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "Please enter a valid email address!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      prefix={<MailOutlined rev={undefined} />}
                    />
                  </Form.Item>

                  <Form.Item
                    className="w-[260px] mb-2"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined rev={undefined} />}
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <div className="flex justify-start">
                      <Checkbox>Remember me</Checkbox>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <div className="flex justify-center">
                      <Button
                        className="border-2 border-slate-900  text-black-500 !rounded-full h-10 !px-10 !py-2 font-semibold 
                        hover:bg-slate-900 hover:text-white flex items-center"
                        htmlType="submit"
                        // onClick={postLogin}
                        loading={loading}
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="w-2/5 bg-slate-900 text-white rounded-tr-2xl round-br-2xl py-36 px-12 flex flex-col">
            <Link to="/">
            <img src={logoLight} className="mb-5" alt="CTQM logo" />
          </Link>
              {/* <img src={logoLight} className="mb-5" alt="" /> */}
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="my-5">
                Fill up your information and start shopping which us.
              </p>
              <Link to={'/register'}>
                <div className="flex justify-center">
                  <Button
                    className="border-2 border-white rounded-full h-10 px-10 py-2 flex items-center font-semibold hover:bg-white
                    hover:text-slate-900 text-white"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>

    </React.Fragment>
  );
}