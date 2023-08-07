import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";
import UserPage from "../pages/user/user";
import ProtectedRoute from "./ProtectedRoute";
import List from "../pages/products/list/list";
import Login from '../pages/auth/login';
import Register from "../pages/auth/register";
import ProductDetails from "../pages/products/productDetails/productDetails";
import Payment from "../pages/paymentt/payment";
import Cart from "../pages/cart/cart";
import PurchaseHistory from "../pages/user/PurchaseHistory";
import ChangePassword from "../pages/user/ChangePassword";
import PaymentResult from "../pages/paymentt/paymentResult";
export default function IndexRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="auth" element={<AuthPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="list" element={<List/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="login" element={<Login/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="register" element={<Register/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="products-details/:carName" element={<ProductDetails/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="payment" element={<Payment/>}></Route>
          <Route path="paymentResult/:result" element={<PaymentResult/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart/>}></Route>
          <Route path="user" element={<UserPage/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="purchase-history" element={<PurchaseHistory/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="change-password" element={<ChangePassword/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );  
}
