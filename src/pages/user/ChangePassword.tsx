import React, { useState } from 'react';
import { ExclamationCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin, notification} from 'antd';
import NavBar from 'src/layout/navigationBar';
import SideMenu from './SideMenu';
import Footer from "src/layout/Footer";
import useTitle from 'src/hooks/useTitle';
import { ctqmService } from '../../services/ctqm.services';
import { ChangePasswordDTO } from '@share/dtos/service-proxies-dtos';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const ChangePassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { customerId } = useParams();
    const navigate = useNavigate();
    
const onFinish = (values: any) => {
    console.log('Success:', values);
    setLoading(true);
    const updatePass: ChangePasswordDTO = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
    };
    ctqmService.customerApi
      .updateCustomerPassword(customerId as string, updatePass)
      .then((response) => {
        console.log("Result: ", response);
        notification.success({
            message: "Action Success",
            description: "Update password success!  ",
            placement: "bottomRight",
            });
        navigate(`/profile/${customerId}`);
      }).catch(({ error }) => {
        notification.error({
            message: "Action Failed",
            description: error?.message ?? "Update password Failed!  ",
            placement: "bottomRight",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

    useTitle("Thay đổi mật khẩu");
  return (
    <React.Fragment>
            <NavBar/>
            <div className="min-h-screen bg-slate-700 leading-normal overflow-x-hidden lg:overflow-auto">
            <div className='flex flex-col flex-1 md:p-0 md:mx-32 '>
                <section className="mx-15 grid grid-cols-4 gap-6 bg-white">
                    <div className="">
                        <SideMenu/>
                    </div>
                    <div className="col-span-3">
                        <div className='px-0 md:px-10 md:mr-7 md:my-20 content-center transition-all flex flex-col'>
                            <h1 className='mt-15 mb-7 text-3xl font-bold'>Change Password</h1>
                            {!loading ? (
                            <div className='grid grid-cols-1 lg:grid-cols-5 gap-7'>
                                <section className="col-span-3">
                                    <Form
                                    name="basic"                                    
                                    layout="vertical"
                                    size='large'
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Current Password"
                                            name="currentPassword"
                                            rules={[{ required: true }]}
                                            hasFeedback
                                            >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            label="New Password"
                                            name="newPassword"
                                            rules={[{ required: true}]}
                                            hasFeedback
                                            >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            dependencies={['newPassword']}
                                            hasFeedback
                                            rules={[
                                              { required: true },
                                              ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                  if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                  }
                                                  return Promise.reject('The two passwords that you entered do not match!');
                                                },
                                              }),
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item>
                                            <div className='flex justify-end'>
                                                <Button className='items-center w-44 bg-slate-800 border border-zinc-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition ease-in-out duration-300 hover:ease-in' htmlType="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </section>
                                <section className='flex flex-col justify-center items-center col-span-2'>
                                <div>
                                    <h4 className='text-slate-600 text-md leading-relaxed font-bold'><ExclamationCircleOutlined rev={undefined} className='mr-2'/>Tips:</h4>
                                    <h6 className='mt-2 ml-6 text-slate-600 text-sm leading-relaxed'>Your password should include numbers, symbols & letters.</h6>
                                    <h6 className='ml-6 text-slate-600 text-sm leading-relaxed'>Please avoid using obvious personal information.</h6>
                                </div>
                                </section>
                            </div>
                            ) : (
                            <Spin size="large" />
                            )}
                            
                        </div>
                    </div>
                </section>
            </div>
            </div> 
            <Footer/>   
        </React.Fragment>
  );
};

export default ChangePassword;