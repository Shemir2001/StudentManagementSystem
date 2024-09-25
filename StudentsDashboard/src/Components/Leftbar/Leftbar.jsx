import React, { useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);


  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`h-screen mt-10 bg-[#001529] ${collapsed ? 'w-20' : 'w-52'} transition-width duration-300`}>
  
      <div className="my-6 text-center text-white">
        {collapsed ? (
          <span className="text-sm">Logo</span>
        ) : (
        <div className='flex space-x-4'>
          <div className='bg-[#0d1f36] p-2 rounded size-8'>
          <RiAdminFill  >
         
        </RiAdminFill>
        </div>
         <span className="text-lg font-semibold">Admin Panel</span>
         </div>
        )}
      </div>

    
      <Menu className='flex flex-col space-y-16'
        theme="dark"
        mode="inline"
  
     
        style={{ background: 'transparent' }}
      >
        <Menu.Item
      
          key="1"
          icon={<UserOutlined />}
          className="text-white hover:bg-[#0d1f36] transition-colors duration-300"
        ><Link to={''}></Link>
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<VideoCameraOutlined />}
          className="text-white hover:bg-[#0d1f36] transition-colors duration-300"
        >
          <Link to={'/gallery'}>Gallery Management</Link>
          
        </Menu.Item>
       
        <Menu.Item
          key="3"
          icon={<UploadOutlined />}
          className="text-white hover:bg-[#0d1f36] transition-colors duration-300"
        >
          <Link to={'/Upload'}></Link>
          
          Uploads
        </Menu.Item>
       
      </Menu>
   

      {/* Toggle Button */}
      {/* <div className="absolute bottom-4 w-full flex justify-center">
        <button
          className="text-white bg-transparent hover:bg-[#0d1f36] rounded p-2 transition-colors duration-300"
          onClick={toggle}
        >
          {collapsed ? '>' : '<'}
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
