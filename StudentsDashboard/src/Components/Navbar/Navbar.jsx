import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FiBell, FiGrid, FiPenTool, FiStar, FiSearch } from 'react-icons/fi'; // Import search icon
import { auth } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
function Navigation() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [userName, setUserName] = useState('')
  const [email,setemail] = useState('')
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log(user)
       setUserName(user.displayName)
       setemail(user.email)
      
      }
    })
  })
  return (
    <Navbar fluid className="bg-[#001529] text-white w-screen p-7 mt-0 fixed top-0 left-0 z-50 ">
      {/* Left side: Logo and Brand Name */}
      <Navbar.Brand className="mt-0 flex items-center" href="https://flowbite-react.com">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/c4/University_of_Gujrat_Logo.png"
          className="mr-3 h-10 w-10 sm:h-12 sm:w-40 object-contain"
          alt="University of Gujrat Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold mr-5 text-[#f1f4ff]">
         Student Managament System
        </span>
      </Navbar.Brand>
     
      <div className="flex-grow flex items-center justify-center px-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" /> {/* Adjusted size */}
        </div>
      </div>

      
      <div className="flex items-center space-x-4 md:order-2">
        
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="flex items-center space-x-2 ml-4 mr-4"> {/* Flex for alignment */}
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
              <span className="text-sm font-semibold text-white">{userName}</span> {/* User's Name */}
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{userName}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>

       
        <Navbar.Toggle />
      </div>

      
      <Navbar.Collapse className="text-[#84a0ff] space-y-2"> 
        <Navbar.Link
          href="#"
          active={activeItem === 'Dashboard'}
          onClick={() => setActiveItem('Dashboard')}
          className={`flex items-center text-base font-medium p-2   hover:text-gray-400 rounded transition-all ${
            activeItem === 'Dashboard' ? 'bg- hover:text-gray-400' : 'text-gray-400'
          }`}
        >
          <FiGrid className="mr-2 text-lg" /> 
          Dashboard
        </Navbar.Link>

       

        <Navbar.Link
          href="#"
          active={activeItem === 'Notifications'}
          onClick={() => setActiveItem('Notifications')}
          className={`flex items-center text-base font-medium p-2 hover:bg-blue-500 hover:text-white rounded transition-all ${
            activeItem === 'Notifications' ? 'bg-blue-600' : 'text-[#f1f4ff]'
          }`}
        >
          <FiBell className="mr-2 text-lg" /> 
          Notifications
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
