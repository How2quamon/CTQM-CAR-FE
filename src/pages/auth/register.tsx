import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo/ctqm-logo-2.png";
import { ctqmService } from "../../services/ctqm.services";
import useTitle from "src/hooks/useTitle";
import NavBar from "src/layout/navigationBar";
import Footer from "src/layout/Footer";
import logoDark from "../../logo/ctqm-logo-dark.svg";

export default function Register() {
  useTitle("Register");
  const { Option } = Select;
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [login, setLogin] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => { }, []);
  const onFinish = (values: any) => {
    // Xử lý dữ liệu đăng nhập khi form submit thành công
    setIsLoading(true);
    console.log(values);
    ctqmService.customerApi
      .createNewCustomer(values)
      .then((response) => {
        setLogin(response);
        notification.success({
          message: "Registration Successful",
          description: "Your account has been registered successfully!",
          placement: "bottomRight",
        });
      })
      .catch(({ error }) => {
        notification.error({
          message: "An error occurred",
          description:
            error?.message ?? "Account or password is not correct!  ",
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

  //   const onFinish = (values: any) => {
  //     console.log("Received values of form: ", values);
  //   };

  return (
    <React.Fragment>
      <div className="flex justify-center py-5 bg-slate-200 ">
        <div className="w-2/5 bg-slate-900 text-white flex justify-center rounded-l-lg py-36 px-12 flex-col">
        {/* <img className="h-6" src={logoDark} alt="CTQM logo" className="h-6 mt-[-270px]"/> */}
          {/* <img
                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                className="object-cover h-full w-full"
              /> */}
          <div className="w-[100px] ">
            <Link to={'/'}><img src={logo} className="h-6 mt-[-270px]" alt="" /></Link>
          </div>
          <div className="mt-[-60px]">
            <h2 className="text-3xl font-bold mb-2">Greetings, new customer!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mt-3 mb-10">
              If you already have an account, please login here!
            </p>
            <Link to={"/login"}>
              <div className="flex justify-center">
                <Button
                  className="border-2 border-white rounded-full h-10 px-10 py-2 flex items-center font-semibold hover:bg-white hover:text-slate-900 text-white"
                  htmlType="submit"
                >
                  Login
                </Button>
              </div>
            </Link>
          </div>
        </div>
        <div
          id="form"
          className=" bg-slate-50 p-6 rounded-r-lg shodow-md shadow-slate-300 w-[580px] "
        >
          <h2 className="text-black text-3xl font-semibold my-4 ml-[200px]  mt-[7px]">
            Register
          </h2>
          <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="customerEmail"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customerPassword"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["customerPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("customerPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="customerName"
              label="Full Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customerPhone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <div className="flex justify-start">
                <Checkbox>
                  I have read the <a href="//#endregion">agreement</a>
                </Checkbox>
              </div>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} className="ml-[60px]">
              <Button
                htmlType="submit"
                loading={loading}
                className="border-2 border-slate-900  text-black-500 !rounded-full h-10 !px-10 !py-2 font-semibold hover:bg-slate-900 hover:text-white flex items-center"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}