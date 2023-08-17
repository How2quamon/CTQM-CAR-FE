//import {Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import logo from "../logo/ctqm-logo-2.png";
import React, { useEffect, useState } from "react";
import { CaretDownOutlined, CustomerServiceOutlined, EditOutlined, InboxOutlined, LogoutOutlined, UserOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space } from 'antd';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [customer, setCustomer] = useState<string>("");
  const [customerID, setCustomerID] = useState<string>("");
  useEffect(() => {
    const customerName = localStorage.getItem("CustomerName");
    const customerId = localStorage.getItem("CustomerId");
    if (customerName != null) {
      setCustomer(customerName);
      setCustomerID(customerId!);
      setIsLogin(true);
    }
  }, []);
  const [showSideBar, setSideBar] = useState(false);
  const handleNav = () => {
    setSideBar(!showSideBar);
  };

  const [changeSearchColor, setSearchColor] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handleSearchBar = () => {
    setSearchColor(!changeSearchColor);
  };
  
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      console.log(searchValue);
      // Call your function here, e.g., handleSearchBar()
      // You might want to pass the searchValue as an argument
      console.log('Enter key pressed');
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-stone-950 text-slate-50">
      <div className="max-w-7xl- mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex justify-between items-center font-bold text-sm md:justify-start">
            <Link to="/">
              <img className="h-5" src={logo} alt="CTQM logo" />
            </Link>
          <div className="hidden lg:inline md:flex space-x-3 flex-1 lg:ml-8">
            <ul className="flex justify-start ">
              <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">
                <Link to="/list">Catalogs</Link>
              </li> 
              <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">             
              {isLogin ? (
                <Link to={`/cart/${customerID}`}>Inventory</Link>
              ) : ( 
                null
              )}
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="relative hidden md:block">
                <div onClick={handleSearchBar} className={changeSearchColor ? "flex items-center border-b border-b-gray-700 bg-slate-700 rounded-lg" : "flex items-center border-b border-b-gray-700"}>                
                  <SearchOutlined className="pl-2 pt-1 text-white text-lg block float-left cursor-pointer mr-2" rev={undefined} />
                  <input
                    type={"search"}
                    placeholder="Search..."
                    className="bg-transparent w-full text-white text-sm focus:outline-none focus:shadow-inner leading-none"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    />
                </div> 
            </div>
            <div className="flex items-center py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <UserOutlined style={{ fontSize: '18px', paddingRight: '4px' }} rev={undefined} />
                {isLogin ? (
                  <Link to={`/profile/${customerID}`}>{customer}</Link>
                ):(
                  <Link to="/login">Account</Link>
                )}
            </div>
              <div onClick={handleNav} className="py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">
                Management
              </div>
          </div>
          {/* Responsive menu for later dev */}
          <div
            className={
              showSideBar
                ? "bg-stone-950 absolute right-0 top-0 w-80 max-h-screen z-1001 ease-in-out duration-300 backdrop-blur-sm"
                : "fixed right-[-100%] "
            }
          >
            <div className="flex justify-end pr-8 pt-7">
              <CloseOutlined onClick={handleNav} className="rounded p-2 hover:bg-slate-700 transition duration-150 ease-out hover:ease-in" style={{ fontSize: '18px' }} rev={undefined} />
            </div>
            <ul className="h-screen pt-8 px-6 bg-stone-950 ">
            <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <Link to={'/product-management'}>Product Management</Link>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <Link to={'/'}>Invoice Management</Link>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <Link to={'/'}>Customer Management</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;