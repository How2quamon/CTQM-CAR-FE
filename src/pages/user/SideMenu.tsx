import {
  CarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuProps, ConfigProvider, Avatar } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useEffect, useState } from "react";

const SideMenu: React.FC = () => {
  let location = useLocation();
  const navigate = useNavigate();
  
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/profile"
      : location.pathname
  );
  const [customerId, setCustomerId] = useState<string>("");
  useEffect(() => {
    const customerId = localStorage.getItem("CustomerId");
    if (customerId != null) {
      setCustomerId(customerId!);
    }
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const items: MenuProps["items"] = [
    {
      label: (
        <Link to={`/profile/purchase-history/${customerId}`}>
          Purchase History
        </Link>
      ),
      key: "/profile/purchase-history/",
      icon: <CarOutlined rev={undefined} />,
    },
    { type: "divider" },
    {
      label: "Manage Account",
      key: "manage-account",
      icon: <SettingOutlined rev={undefined} />,
      children: [
        {
          label: <Link to={`/profile/${customerId}`}>Profile</Link>,
          key: "/profile",
        },
        {
          label: (
            <Link to={`/profile/change-password/${customerId}`}>
              Change Password
            </Link>
          ),
          key: "/profile/change-password",
        },
      ],
    },
    { type: "divider" },
    {
      label: "Log Out",
      key: "/log-out",
      icon: <LogoutOutlined rev={undefined} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("CustomerName");
    localStorage.removeItem("CustomerId");
    navigate("/");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  function handleClick(e: any) {
    setCurrent(e.key);
    if (e.key == "/log-out") {
      console.log("LOGIN OUT");
      handleLogout();
    }
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: "#334454",
            },
          },
        }}
      >
        <div className="w-full h-64 px-3 py-4 flex justify-center items-center border-b border-r border-blue-gray-50 ">
          <Avatar
            size={200}
            src={
              <img
                src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt="avatar"
              />
            }
          />
        </div>
        <Menu
          onClick={handleClick}
          style={{ height: "100vh" }}
          defaultOpenKeys={["manage-account"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        ></Menu>
      </ConfigProvider>
      <Outlet />
    </>
  );
};

export default SideMenu;
