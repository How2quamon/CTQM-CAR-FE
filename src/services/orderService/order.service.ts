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
    updateOrder,
    deleteOrderWithId,
}