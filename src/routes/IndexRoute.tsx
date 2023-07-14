import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";
import UserPage from "../pages/user/user";
import ProtectedRoute from "./ProtectedRoute";
import List from "../pages/products/list/list"

export default function IndexRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="auth" element={<AuthPage />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="user" element={<UserPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="user" element={<UserPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="list" element={<List/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );  
}
