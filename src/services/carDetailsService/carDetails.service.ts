import { CarDetailDTO } from "@share/dtos/service-proxies-dtos";
import { notification } from "antd";
import axios from "axios";

const baseURL = "https://localhost:7147";

const api = axios.create({
  baseURL,
});

// Hàm này sẽ thêm JWT token vào header trước mỗi lần gọi API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token"); // Thay đổi thành cách lấy JWT token trong ứng dụng của bạn
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
        message: "Unauthorized",
        description: "You are not logged in, Unauthorized!",
        placement: "bottomRight",
      });
    }
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: "You are not logged in, Forbidden!",
        placement: "bottomRight",
      });
    }
    return Promise.reject(error);
  }
);

const getCarDetailWithId = async (id: string) => {
  const response = await api.get(`/api/CarDetail/GetByCarId/${id}`);
  return response.data;
};

const getCarDetailWithName = async (id: string) => {
  // const response = await api.get(`/api/CarDetail/${id}`);
  // return response.data;
};

const createNewCarDetail = async (body: CarDetailDTO) => {
  const response = await api.post("/api/CarDetail/NewCarDetail", body);
  return response.data;
};

const updateCarDetail = async (id: string, body: CarDetailDTO) => {
  const response = await api.put(`/api/CarDetail/UpdateCarDetail/${id}`, body);
  return response.data;
};

// const deleteCarDetailWithId = async (id: string) => {
//     const response = await api.delete(`/api/CarDetail/DeleteCarDetail/${id}`);
//     return response.data;
// }

export const carDetailService = {
  getCarDetailWithId,
  getCarDetailWithName,
  createNewCarDetail,
  updateCarDetail,
};
