import { CarDTO } from '@share/dtos/service-proxies-dtos';
import axios from 'axios';

const baseURL = 'https://ctqmapi.azurewebsites.net';

const api = axios.create({
    baseURL,
}) 


// Hàm này sẽ thêm JWT token vào header trước mỗi lần gọi API
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('jwtToken'); // Thay đổi thành cách lấy JWT token trong ứng dụng của bạn
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
  
const getAllCar = async () => {
    const response = await api.get('/api/Car');
    return response.data;
}

const getCarWithId = async (id: string) => {
    const response = await api.get(`/api/Car/${id}`);
    return response.data;
}

const getCarWithModel = async (carModel: string) => {
    const response = await api.get(`/api/Car/GetCarWithModel/${carModel}`);
    return response.data;
}

const createNewCar = async (body: CarDTO) => {
    const response = await api.post('/api/Car/NewCar', body);
    return response.data;
}

const updateCar = async (id: string, body: CarDTO) => {
    const response = await api.put(`/api/Car/UpdateCar/${id}`, body);
    return response.data;
}

const deleteCarWithId = async (id: string) => {
    const response = await api.delete(`/api/Car/DeleteCar/${id}`);
    return response.data;
}

export const  carService = {
    getAllCar,
    getCarWithId,
    getCarWithModel,
    createNewCar,
    updateCar,
    deleteCarWithId,
}