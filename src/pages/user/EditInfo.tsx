import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ctqmService } from '../../services/ctqm.services';
import { ChangeInfoDTO, CustomerDTO } from '@share/dtos/service-proxies-dtos';
import dayjs from 'dayjs';

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
//edit info 
const EditInfo: React.FC = () => {
  //functions for form
  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  //avatar function
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  let navigate = useNavigate();
  const { customerId } = useParams();
  const [getdata, setGetData] = useState(false);
  const [customers, setCustomers] = useState<CustomerDTO | null>(null)

  useEffect(() => {
    getUserInfo();
  }, [getdata]);
  
  const onFinish = async (e:CustomerDTO) => {
    console.log("OSIDJFOIWERJOWER: ", e);
    const updateInfo: ChangeInfoDTO =
    {
      customerName: e.customerName,
      customerPhone: e.customerPhone,
      customerAddress: e.customerAddress,
      customerDate: e.customerDate,
      customerLicense: e.customerLicense,
      customerEmail: e.customerEmail,
      customerVaild: true
    };
    updateInfor(customerId as string, updateInfo);
    // navigate("/");
  };

  const updateInfor = (customerId: string, body: ChangeInfoDTO) => {
    setGetData(false);
    setLoading(true);
    console.log("UPDATE", customerId, body);
    ctqmService.customerApi
      .updateCustomerInfo(customerId, body)
      .then((response) => {
        console.log("Result: ", response);
        setCustomers(response);
        setGetData(true);
        notification.success({
          message: "Action Success",
          description: "Update profile success!  ",
          placement: "bottomRight",
        });
      }).catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Update profile Failed!  ",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserInfo = () => {
    setLoading(true);
    console.log("LẤY THÔNG TIN: ", customerId);
    ctqmService.customerApi
      .getCustomerWithId(customerId as string)
      .then((response) => {
        setCustomers(response);
        setGetData(true);
      }).catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Cannot get your profile!  ",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!customers) {
    return <Spin size="large" className="flex justify-center items-center" />;
  }

  return (
    <>
      <div className='px-0 md:px-10 md:my-20 content-center transition-all flex flex-col'>
        <h1 className='mt-15 mb-7 text-3xl font-bold'>My Profile</h1>
        {customers !== undefined ? (
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-7'>
                <section className="col-span-3">
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                      customerEmail: customers?.customerEmail,
                      customerName: customers?.customerName,
                      customerPhone: customers?.customerPhone,
                      customerAddress: customers?.customerAddress,
                      customerLicense: customers?.customerLicense,
                      customerDate: dayjs(customers?.customerDate),
                      prefix: '84' 
                    }}
                    size='large'
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                  >
                    <Form.Item
                      name="customerEmail"
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
                      <Input defaultValue={customers?.customerEmail} />
                    </Form.Item>

                    <Form.Item
                      name="customerName"
                      label="Full name"
                      tooltip="You should use the name included in your payment card!"
                      rules={[{ required: true, message: 'Please input your full name!', whitespace: true }]}
                    >
                      <Input defaultValue={customers?.customerName}/>
                    </Form.Item>

                    <Form.Item
                      name="customerPhone"
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={customers?.customerPhone}/>
                    </Form.Item>

                    <Form.Item
                      name="customerAddress"
                      label="Address"
                      rules={[{ required: true, message: 'Please input your address!', whitespace: false }]}
                    >
                      <Input defaultValue={customers?.customerAddress} />
                    </Form.Item>

                    <Form.Item
                      name="customerLicense"
                      label="License"
                      rules={[{ required: true, message: 'Please select license!' }]}
                    >
                      <Select placeholder="Select your license"
                      defaultValue={customers?.customerLicense}>
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

                    <Form.Item
                      name="customerDate"
                      label="Date of Birth"
                      style={{ maxWidth: 600 }}
                      rules={[{ required: true, message: 'What is your bithday?!' }]}
                    >
                      <DatePicker defaultValue={dayjs(customers?.customerDate)}/>
                    </Form.Item>

                    <Form.Item>
                      <div className='flex justify-end'>
                        <Button className='items-center w-44 bg-slate-800 border border-zinc-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition ease-in-out duration-300 hover:ease-in' htmlType="submit">
                          Save
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </section>
                <section className='flex flex-col justify-center items-center col-span-2'>
                  <div>
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </div>
                  <h6 className='mt-3 text-slate-600 text-sm leading-relaxed'>You can only upload JPG/PNG file</h6>
                  <h6 className='text-slate-600 text-sm leading-relaxed'>Image must be smaller than 2MB!</h6>
                </section>
              </div >
        ) : (
          <div className="flex justify-center items-center ">
            <Spin size="large"  />
          </div>
        )}  
      </div>
    </>
  );
};

export default EditInfo;