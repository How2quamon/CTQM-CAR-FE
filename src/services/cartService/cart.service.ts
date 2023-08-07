import { CartDTO, QuickAddCartDTO } from "@share/dtos/service-proxies-dtos";
import { notification } from "antd";
import axios from "axios";

const baseURL = "https://ctqmapi.azurewebsites.net";

const api = axios.create({
  baseURL,
});

// Hàm này sẽ thêm JWT token vào header trước mỗi lần gọi API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // Thay đổi thành cách lấy JWT token trong ứng dụng của bạn
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
      });
    }
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: "You are not logged in, Forbidden!",
      });
    }
    return Promise.reject(error);
  }
);

const getAllCart = async () => {
  const response = await api.get("/api/Cart/GetCallCart");
  return response.data;
};

const getCustomerCart = async (id: string) => {
  const response = await api.get(`/api/Cart/GetCustomerCart/${id}`);
  return response.data;
};

const addToCart = async (body: CartDTO) => {
  const response = await api.post("/api/Cart/AddToCart", body);
  return response.data;
};

const quickAddToCart = async (body: QuickAddCartDTO) => {
  const response = await api.post("/api/Cart/QuickAddToCart", body);
  return response.data;
};

const updateCart = async (id: string, amount: number) => {
  const response = await api.put(`/api/Cart/UpdateCart/${id}`, amount);
  return response.data;
};

const deleteCartWithId = async (id: string) => {
  const response = await api.delete(`/api/Cart/DeleteCart/${id}`);
  return response.data;
};

export const cartService = {
  getAllCart,
  getCustomerCart,
  addToCart,
  quickAddToCart,
  updateCart,
  deleteCartWithId,
};
