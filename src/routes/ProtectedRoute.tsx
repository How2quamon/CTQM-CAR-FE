import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

type ProtectedRouteProps = {
    permission?: string[];
    role?: string[];
};

export default function ProtectedRoute({ permission, role }: ProtectedRouteProps) {

    const isLogin = useAppSelector((state) => state.session.isLogin);


    console.log("Hi đây là protected route");

    if (!isLogin) console.log("Chưa login");

    return (<Outlet />)
}