import React, { useEffect, useState } from 'react';
import { app } from '../../firebase/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { message } from 'antd';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [togglepassword, settogglepassword] = useState(false);

  const Passwordtoggle = () => {
    settogglepassword(!togglepassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userObj) => {
      if (userObj) {
        
      }
    });
    return () => unsubscribe();
  }, []);

  const handlesSignin = async () => {
    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        message.success('Login successful');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        message.error('Please verify your email');
        navigate('/email');
      }
    } catch (error) {
      message.error('Invalid email or password');
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlepasswordReset=async ()=>{
    await sendPasswordResetEmail(auth,formData.email);
    message.success('Password reset email sent');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handlesSignin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-700">
      <div className="flex w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-green-400 to-teal-500 p-8 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">To keep connected with us please login with your personal info</p>
          <button
            className="border-2 border-white px-8 py-2 rounded-full text-lg hover:bg-white hover:text-teal-500 transition-all"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChanges}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6 relative"> 
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChanges}
                type={togglepassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={Passwordtoggle}
                className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {togglepassword ? <FiEyeOff /> : <FiEye />} 
              </button>
            </div>
            <div className="flex justify-between items-center">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <Link to={'/forgetpassword'} className="text-sm text-teal-600 hover:underline">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
