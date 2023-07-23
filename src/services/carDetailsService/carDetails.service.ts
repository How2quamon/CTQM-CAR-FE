import { CarDetailDTO } from '@share/dtos/service-proxies-dtos';
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

const getCarDetailWithId = async (id: string) => {
    const response = await api.get(`/api/CarDetail/${id}`);
    return response.data;
}

const getCarDetailWithName = async (id: string) => {
    // const response = await api.get(`/api/CarDetail/${id}`);
    // return response.data;
}

const createNewCarDetail = async (body: CarDetailDTO) => {
    const response = await api.post('/api/CarDetail/NewCarDetail', body);
    return response.data;
}

const updateCarDetail = async (id: string, body: CarDetailDTO) => {
    const response = await api.put(`/api/CarDetail/UpdateCarDetail/${id}`, body);
    return response.data;
}

// const deleteCarDetailWithId = async (id: string) => {
//     const response = await api.delete(`/api/CarDetail/DeleteCarDetail/${id}`);
//     return response.data;
// }

export const carDetailService = {
    getCarDetailWithId,
    getCarDetailWithName,
    createNewCarDetail,
    updateCarDetail,
}