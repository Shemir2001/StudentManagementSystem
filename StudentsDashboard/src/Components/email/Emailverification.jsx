import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { auth } from '../../firebase/Firebase';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const EmailVerification = () => {
  const [user, setUser] = useState({}); // Store user object instead of email
const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async  (currentUser) => {
      if (currentUser) {
       await currentUser.reload()
        setUser(currentUser); // Set the entire user object
        if(currentUser.emailVerified){
          navigate('/login')
        }
        else{
          navigate('/email')
        }
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [navigate]);

  const handleSend = async () => {

      try {
        await sendEmailVerification(user); // Pass the user object
        message.success('Email sent successfully');
    
      } catch (error) {
        console.error('Error sending email verification:', error); // Log the error
        message.error('Something went wrong. Please try again.');
      }
    } 
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-teal-700 animate-gradient">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg p-8 transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Email Verification
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Thank you for registering! Please Verify your account to continue!
        </p>
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleSend} 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Send Email Verification
          </button>
          <div className="flex justify-center mt-4">
            <Link to={'/login'} >
          <button 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
          </Link>
        </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Didn’t receive the email? 
          <span className="font-medium text-blue-600 cursor-pointer hover:underline"> 
            Contact Support 
          </span>
          or try again later.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <footer className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default EmailVerification;
