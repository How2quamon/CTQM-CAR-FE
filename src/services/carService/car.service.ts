import { CarDTO } from '@share/dtos/service-proxies-dtos';
import { notification } from 'antd';
import axios from 'axios';
import { Buffer } from 'buffer';

const baseURL = 'https://ctqmapi.azurewebsites.net';

const api = axios.create({
    baseURL,
}) 


// Hàm này sẽ thêm JWT token vào header trước mỗi lần gọi API
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('Token'); // Thay đổi thành cách lấy JWT token trong ứng dụng của bạn
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
      // Xử lý response ở đây nếu cần
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        notification.error({
          message: 'Unauthorized',
          description: 'You are not logged in, Unauthorized!',
          placement: "bottomRight",
        });
      }
      if (error.response.status === 403) {
        notification.error({
          message: 'Forbidden',
          description: 'You are not logged in, Forbidden!',
          placement: "bottomRight",
        });
      }
      return Promise.reject(error);
    }
  );
  
const getAllCar = async () => {
    const response = await api.get('/api/Car');
    return response.data;
}

const getCarWithId = async (id: string) => {
    const response = await api.get(`/api/Car/${id}`);
    return response.data;
}

const searchCar = async (carName: string) => {
  const response = await api.get(`/api/Car/SearchForCars/${carName}`);
  return response.data;
}

const getCarWithModel = async (carModel: string) => {
    const response = await api.get(`/api/Car/GetCarWithModel/${carModel}`);
    return response.data;
}

const getCarByName = async (carName: string) => {
    const response = await api.get(`/api/Car/GetCarByName/${carName}`);
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
    searchCar,
    createNewCar,
    updateCar,
    deleteCarWithId,
    getCarByName
}