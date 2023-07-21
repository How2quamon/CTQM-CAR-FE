//import {Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import logo from "../logo/ctqm-logo-2.png";
import React, { useState } from "react";
import { CaretDownOutlined, CustomerServiceOutlined, EditOutlined, InboxOutlined, LogoutOutlined, UserOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space } from 'antd';

const NavBar = () => {
  const [showSideBar, setSideBar] = useState(false);
  const handleNav = () => {
    setSideBar(!showSideBar);
  };

  const [changeSearchColor, setSearchColor] = useState(false);
  const handleSearchBar = () => {
    setSearchColor(!changeSearchColor);
  };
  // const { Search } = Input;
  // const onSearch = (value: string) => console.log(value);


  return (
    <div className="sticky top-0 z-10 bg-stone-950 text-slate-50">
      <div className="max-w-7xl- mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex justify-between items-center font-bold text-sm md:justify-start">
          
            <a href="#">
              <img className="h-5" src={logo} alt="CTQM logo" />
            </a>
          <div className="hidden lg:inline md:flex space-x-3 flex-1 lg:ml-8">
            <ul className="flex justify-start ">
              <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">
                <a href="/list">Catalogs</a>
              </li>
              <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">
                <a href="#">About Us</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="relative hidden md:block">
                <div onClick={handleSearchBar} className={changeSearchColor ? "flex items-center border-b border-b-gray-700 bg-slate-700 rounded-lg" : "flex items-center border-b border-b-gray-700"}>                
                  <SearchOutlined className="pl-2 pt-1 text-white text-lg block float-left cursor-pointer mr-2" rev={undefined} />
                  <input type={"search"} placeholder="Search..." className="bg-transparent w-full text-white text-sm focus:outline-none focus:shadow-inner leading-none" />
                </div> 
            </div>
            <div className="flex items-center py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <UserOutlined style={{ fontSize: '18px', paddingRight: '4px' }} rev={undefined} />
                <a href="#">Account</a>
            </div>
              <div onClick={handleNav} className="py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in hover:cursor-pointer">
                Menu
              </div>
          </div>
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

              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in ">
                <a href="https://www.tesla.com/inventory/new/m3">
                  Existing Inventory
                </a>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <a href="https://www.tesla.com/inventory/used/m3">
                  Used Inventory
                </a>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <a href="https://www.tesla.com/tradein">Trade-In</a>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <a href="https://www.tesla.com/drive">Test Drive</a>
              </li>
              <li className="py-5 pl-3 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
                <a href="https://www.tesla.com/insurance">Insurance</a>
              </li>            
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;