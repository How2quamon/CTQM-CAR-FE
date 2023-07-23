import { ChangeInfoDTO, ChangePasswordDTO, CustomerCreateDTO, CustomerLoginDTO } from '@share/dtos/service-proxies-dtos';
import axios from 'axios';

const baseURL = 'http://localhost:5205';

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
  
const loginAction = async (body: CustomerLoginDTO) => {
    const response = await api.post('/api/Customer/Login', body);
    return response.data;
}

const logoutAction = async (id: string) => {
    const response = await api.post(`/api/Customer/Logout/${id}`);
    return response.data;
}

const getAllCustomer = async () => {
    const response = await api.get('/api/Customer/GetAllCustomer');
    return response.data;
}

const getCustomerWithId = async (id: string) => {
    const response = await api.get(`/api/Customer/CustomerInfo/${id}`);
    return response.data;
}

const createNewCustomer = async (body: CustomerCreateDTO) => {
    const response = await api.post('/api/Customer/CreateNewCustomer', body);
    return response.data;
}

const updateCustomerInfo = async (id: string, body: ChangeInfoDTO) => {
    const response = await api.put(`/api/Customer/ChangeCustomerInfo/${id}`, body);
    return response.data;
}

const updateCustomerPassword = async (id: string, body: ChangePasswordDTO) => {
    const response = await api.put(`/api/Customer/ChangeCustomerPassword/${id}`, body);
    return response.data;
}

const deleteCustomerWithId = async (id: string) => {
    const response = await api.delete(`/api/Customer/DeleteCustomer/${id}`);
    return response.data;
}

export const customerService = {
    loginAction,
    logoutAction,
    getAllCustomer,
    getCustomerWithId,
    createNewCustomer,
    updateCustomerInfo,
    updateCustomerPassword,
    deleteCustomerWithId,
}