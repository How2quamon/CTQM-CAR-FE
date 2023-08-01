import { CartDTO } from '@share/dtos/service-proxies-dtos';
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
  
const getAllCart = async () => {
    const response = await api.get('/api/Cart/GetCallCart');
    return response.data;
}

const getCustomerCart = async (id: string) => {
    const response = await api.get(`/api/Cart/GetCustomerCart/${id}`);
    return response.data;
}

const addToCart = async (body: CartDTO) => {
    const response = await api.post('/api/Cart/AddToCart', body);
    return response.data;
}

const updateCart = async (id: string, amount: number) => {
    const response = await api.put(`/api/Cart/UpdateCart/${id}`, amount);
    return response.data;
}

const deleteCartWithId = async (id: string) => {
    const response = await api.delete(`/api/Cart/DeleteCart/${id}`);
    return response.data;
}

export const cartService ={
    getAllCart,
    getCustomerCart,
    addToCart,
    updateCart,
    deleteCartWithId,
}