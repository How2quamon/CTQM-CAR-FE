
import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import logo from '../../logo/ctqm-logo-2.png'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import { Link } from 'react-router-dom';

interface VMLogin {
    Email: string;
    Password: string;
    KeepLogedIn: boolean;
    NewEmail: string;
    NewPassword: string;
    NewName: string;
    NewPhone: string;
}

export default function Register() {

    const [isLoginForm, setIsLoginForm] = useState(true);
    const { Option } = Select;

    interface DataNodeType {
        value: string;
        label: string;
        children?: DataNodeType[];
    }

    const residences: CascaderProps<DataNodeType>['options'] = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

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
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const InputType = (props: { inputName: any; inputTypes: any; descriptionInput: any; onChangHandler: any; onBlurHandler: any; iconName: any; }) => {

        const { inputName, inputTypes, descriptionInput, onChangHandler, onBlurHandler, iconName } = props;
    }

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);

    };
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    return (
        <React.Fragment>
            <div className='flex justify-center  bg-slate-200 '  >
                <div className="w-2/5 bg-slate-900 text-white flex justify-center rounded-l-lg py-36 px-12 flex-col">
                    <div className='w-[100px] '><img src={logo} className='mt-[-270px]' /></div>
                    <div className="mt-[-60px]">
                        <h2 className="text-3xl font-bold mb-2">Hello, New Friend!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>If you already have an account, please login here!</p>
                        <Link to={'/login'}>
                            <div className="flex justify-center">
                                <Button className='border-2 border-white rounded-full px-10 py-2 flex items-center font-semibold hover:bg-white
                        hover:text-slate-900 text-white' htmlType="submit">
                                    Login
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div id="form" className=' bg-slate-50 p-6 rounded-r-lg shodow-md shadow-slate-300 w-[580px] '>
                    <h2 className='text-black text-3xl font-semibold my-4 ml-[200px]  mt-[7px]'>Register</h2>
                    <Form
                        layout="vertical"
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="Full Name"
                            label="Full Name"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your fullname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please select gender!' }]}
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
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            <div className='flex justify-start'>
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </div>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} className='ml-[60px]' >
                            <Button type="primary" htmlType="submit" className='bg-slate-900 h-10 text-white cursor-pointer rounded-md hover:bg-slate-900 hover:outline outline-2 outline-black outline-offset-2 text-sm'>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
};