import { CarDetailDTO } from '@share/dtos/service-proxies-dtos';
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