import { CustomerPaymentDTO, OrderDTO } from "@share/dtos/service-proxies-dtos";
import { message, notification } from "antd";
import axios from "axios";

const baseURL = "https://ctqmapi.azurewebsites.net";

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
const getAllOrder = async () => {
  const response = await api.get("/api/Order");
  return response.data;
};

const getOrderWithId = async (id: string) => {
  const response = await api.get(`/api/Order/${id}`);
  return response.data;
};

const getCustomerOrder = async (customerId: string) => {
  const response = await api.get(`/api/Order/CustomerOrder/${customerId}`);
  return response.data;
};

const createNewOrder = async (body: OrderDTO) => {
  const response = await api.post("/api/Order/NewOrder", body);
  return response.data;
};

const customerPayment = async (body: CustomerPaymentDTO) => {
  const response = await api.post("/api/Order/CustomerPayment", body);
  return response.data;
};

const paypalPayment = async (customerId: string) => {
  const response = await api.get(`/api/Paypal/CreatedPayment/${customerId}`);
  return response.data;
};

const vnPayPayment = async (customerId: string) => {
  const response = await api.get(`/api/VNPay/CreatedPaymentVNPay/${customerId}`);
  return response.data;
};

const updateOrder = async (id: string, body: OrderDTO) => {
  const response = await api.put(`/api/Order/UpdateOrder/${id}`, body);
  return response.data;
};

const deleteOrderWithId = async (id: string) => {
  const response = await api.delete(`/api/Order/DeleteOrder/${id}`);
  return response.data;
};

export const orderService = {
  getAllOrder,
  getOrderWithId,
  getCustomerOrder,
  createNewOrder,
  customerPayment,
  paypalPayment,
  vnPayPayment,
  updateOrder,
  deleteOrderWithId,
};
