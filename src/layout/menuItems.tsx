import React from 'react';
// import { CaretDownOutlined, CustomerServiceOutlined, EditOutlined, InboxOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {Menu} from 'antd';
import { HomeOutlined, CarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Card,
//   IconButton,
// } from "@material-tailwind/react";
export default function  MenuItems() {
  return (
    <Menu mode="horizontal" className='font-semibold text-[14px] '>
      <Menu.Item key="home" icon={<HomeOutlined rev={undefined}/>}>
        Home
      </Menu.Item>
      <Menu.Item key="cars" icon={<CarOutlined rev={undefined} />}>
        Cars
      </Menu.Item>
      <Menu.Item key="cart" icon={<ShoppingCartOutlined rev={undefined} />}>
        Cart
      </Menu.Item>
    </Menu>
  );
};

// profile menu component
// const profileMenuItems = [
//   {
//     label: "My Profile",
//     icon: <UserOutlined rev={undefined} />,
//   },
//   {
//     label: "Edit Profile",
//     icon: <EditOutlined rev={undefined} />,
//   },
//   {
//     label: "Inbox",
//     icon: <InboxOutlined rev={undefined} />,
//   },
//   {
//     label: "Help",
//     icon: <CustomerServiceOutlined rev={undefined} />,
//   },
//   {
//     label: "Sign Out",
//     icon: <LogoutOutlined rev={undefined} />,
//   },
// ];
 
// function ProfileMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const closeMenu = () => setIsMenuOpen(false);
 
//   return (
//     <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
//       <MenuHandler>
//         <Button
//           variant="text"
//           color="blue-gray"
//           className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
//         >
//           <Avatar
//             variant="circular"
//             size="sm"
//             alt="tania andrew"
//             className="border border-blue-500 p-0.5"
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
//           />
//           <CaretDownOutlined 
//             style={{ fontSize: '18px' }}
//             className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} rev={undefined}/>
//         </Button>
//       </MenuHandler>
//       <MenuList className="p-1">
//         {profileMenuItems.map(({ label, icon }, key) => {
//           const isLastItem = key === profileMenuItems.length - 1;
//           return (
//             <MenuItem
//               key={label}
//               onClick={closeMenu}
//               className={`flex items-center gap-2 rounded ${
//                 isLastItem
//                   ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
//                   : ""
//               }`}
//             >
//               {React.createElement(icon, {
//                 className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`
                
//               })}
//               <Typography
//                 as="span"
//                 variant="small"
//                 className="font-normal"
//                 color={isLastItem ? "red" : "inherit"}
//               >
//                 {label}
//               </Typography>
//             </MenuItem>
//           );
//         })}
//       </MenuList>
//     </Menu>
//   );
// }

// export default ProfileMenu;
