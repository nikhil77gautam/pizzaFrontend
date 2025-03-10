import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn,setLoggedIn] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async(e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/customerlogin",input)
    try {
      
    if(res.data.success){
      console.log(res.data)
      
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem("customerId", res.data._id)
    
    navigate("/")
    }else{
      alert(res.data.message)
    }
    } catch (error) {
      console.error("Error during login:", error);
    }

  
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black  z-20">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 w-full max-w-md rounded-lg relative bg-white bg-opacity-10 p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-white text-xl">Login</h3>
          <FaTimes className="text-gray-600 cursor-pointer" onClick={() => navigate('/')} />
        </div>
        <hr className="my-2" />
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            className="input-popup rounded-lg w-full h-10 px-3 bg-white border border-gray-300"
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Enter Your Email"
            required
          />
          <input
            className="input-popup rounded-lg w-full h-10 px-3 bg-white border border-gray-300"
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Your Password"
            required
          />
          <button
            className="submit-button rounded-lg bg-orange-500 text-white w-full h-10 mt-4"
            type="submit"
          >
            Submit Now
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
          <Link to="/registration" className="text-blue-500">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;