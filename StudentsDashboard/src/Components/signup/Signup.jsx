import React, { useState } from 'react';
import { auth } from '../../firebase/Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: formData.name });
      message.success('User created and profile updated successfully');

      navigate('/email');
    } catch (error) {
      console.error('Error creating user or updating profile:', error);
      message.error(`Failed to create user: ${error.message}`);
    }
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      handleCreateUser();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-700">
      <div className="bg-white w-screen max-w-4xl flex rounded-lg shadow-lg overflow-hidden">
     
        <div className="w-1/2 bg-gradient-to-br from-green-400 to-teal-500 p-12 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
          <p className="mb-6 text-lg">
            To keep connected with us please login with your personal info.
          </p>
          <Link to={"/login"}>
            <button className="border-2 border-white px-8 py-2 rounded-full text-lg hover:bg-white hover:text-teal-500 transition-all">
              Sign In
            </button>
          </Link>
        </div>

        <div className="w-1/2 p-12">
          <h2 className="text-3xl font-bold text-teal-500 mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
          
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2">
                <i className="fas fa-user text-gray-400"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 focus:outline-none ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2">
                <i className="fas fa-envelope text-gray-400"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 focus:outline-none ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

         
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2 relative">
                <i className="fas fa-lock text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 focus:outline-none ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 text-gray-400 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />} 
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-full mt-4 hover:bg-teal-600 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
