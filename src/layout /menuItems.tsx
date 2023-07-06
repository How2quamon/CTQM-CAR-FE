import React from 'react';
import { Menu } from 'antd';
import { CarOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

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
