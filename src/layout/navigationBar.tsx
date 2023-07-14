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
  // const { Search } = Input;
  // const onSearch = (value: string) => console.log(value);


  return (
    <div className="sticky top-0 z-10 bg-stone-950 text-slate-50">
      <div className="flex justify-between items-center font-bold px-12 p-4 text-sm ">
        <div>
          <a href="#">
            <img className="h-5" src={logo} alt="CTQM logo" />
          </a>
        </div>
        <div className="hidden lg:inline">
          <ul className="flex justify-center hover:cursor-pointer">
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Mayback</a>
            </li>
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Mercedes</a>
            </li>
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">AMG</a>
            </li>
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Model Y</a>
            </li>
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Solar Roof</a>
            </li>
            <li className="py-2 px-4 mx-1 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Solar Panels</a>
            </li>
          </ul>
        </div>
        <div className="hidden lg:inline">
          <ul className="flex justify-center hover:cursor-pointer">
            {/* <li className="py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <a href="#">Cart</a>
            </li> */}
            <li className="flex justify-between items-center py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              <UserOutlined style={{ fontSize: '18px', paddingRight: '4px' }} rev={undefined} />
              <a href="#">Account</a>
            </li>
            <li onClick={handleNav} className="py-2 px-4 hover:rounded hover:bg-slate-700 transition duration-150 ease-out hover:ease-in">
              Menu
            </li>
          </ul>
        </div>
        <div className="lg:hidden">
          <button onClick={handleNav} className="inline-flex items-center rounded-md py-2 px-4 p-2 text-sm font-medium bg-black/5 shadow-sm hover:bg-black/10 transition duration-150 ease-out hover:ease-in">
            Menu
          </button>
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
            <li className="py-5 pl-3 inline-block align-middle">
              <div className="flex justify-between items-center rounded-md bg-slate-700">
                <input type={"search"} placeholder="Search..." className="pl-3 bg-transparent w-full text-white text-sm focus:outline-none" />
                <SearchOutlined className="px-2 py-1 text-white text-lg block float-right cursor-pointer mr-2" rev={undefined} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;