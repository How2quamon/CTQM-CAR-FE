import { CustomerPaymentDTO, OrderDTO } from '@share/dtos/service-proxies-dtos';
import axios from 'axios';

const baseURL = 'https://ctqmapi.azurewebsites.net';

const api = axios.create({
    baseURL,
}) 


// Hàm này sẽ thêm JWT token vào header trước mỗi lần gọi API
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken'); // Thay đổi thành cách lấy JWT token trong ứng dụng của bạn
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => {
    // Xử lý response ở đây nếu cần
    return response;
  },
  (error) => { 
    if (error.response.status === 401) {
      // Xử lý status code "Unauthorized" (401)
      // Ví dụ: chuyển hướng về trang đăng nhập, gửi pop-up thông báo
      // history.push('/login');
      console.log("CHƯA LOGIN, Unauthorized");
    }
    if (error.response.status === 403) {
      // Xử lý status code "Forbidden" (403)
      // Ví dụ: chuyển hướng về trang đăng nhập, gửi pop-up thông báo
      // history.push('/login');
      console.log("CHƯA LOGIN, Forbidden");
    }
    return Promise.reject(error);
  }
);

const getOrderWithId = async (id: string) => {
    const response = await api.get(`/api/Order/${id}`);
    return response.data;
}

const getCustomerOrder = async (customerId: string) => {
    const response = await api.get(`/api/Order/CustomerOrder/${customerId}`);
    return response.data;
}

const createNewOrder = async (body: OrderDTO) => {
    const response = await api.post('/api/Order/NewOrder', body);
    return response.data;
}

const customerPayment = async (body: CustomerPaymentDTO) => {
    const response = await api.post('/api/Order/CustomerPayment', body);
    return response.data;
}

const paypalPayment = async (cartId: string) => {
  const response = await api.post(`/api/Paypal/CreatedPayment/${cartId}`);
  return response.data;
}

const vnPayPayment = async (cartId: string) => {
  const response = await api.post(`/api/VNPay/CreatedPaymentVNPay/${cartId}`);
  return response.data;
}

const updateOrder = async (id: string, body: OrderDTO) => {
    const response = await api.put(`/api/Order/UpdateOrder/${id}`, body);
    return response.data;
}

const deleteOrderWithId = async (id: string) => {
    const response = await api.delete(`/api/Order/DeleteOrder/${id}`);
    return response.data;
}

export const orderService = {
    getOrderWithId,
    getCustomerOrder,
    createNewOrder,
    customerPayment,
    paypalPayment,
    vnPayPayment,
    updateOrder,
    deleteOrderWithId,
}