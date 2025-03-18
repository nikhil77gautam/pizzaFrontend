import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://pizzabackend-0x3r.onrender.com/customersignup", input);
      if (res.data.success) {
        alert("Please verify your email to complete the registration.");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      console.log("error",error)
    }
  };

  return (
    <div
      className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-20'
      style={{
        backgroundImage: 'url(https://i.pinimg.com/564x/42/d6/2e/42d62e2bffbd1d553c4f1edb741587d1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 w-full max-w-md rounded-lg relative bg-white bg-opacity-10 p-6 z-10'>
        <div className='flex justify-center items-center mb-4'>
          <h3 className='font-extrabold text-white text-xl'>Sign Up</h3>
        </div>
        <hr className='my-2' />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className='input-popup rounded-sm w-full h-10 px-3 bg-white border border-gray-300'
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder='Enter Your Name'
            required
          />
          <input
            className='input-popup rounded-sm w-full h-10 px-3 bg-white border border-gray-300'
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder='Enter Your Email'
            required
          />
          <input
            className='input-popup rounded-sm w-full h-10 px-3 bg-white border border-gray-300'
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={handleChange}
            placeholder='Enter Your Phone Number'
            required
          />
          <input
            className='input-popup rounded-sm w-full h-10 px-3 bg-white border border-gray-300'
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder='Your Password'
            required
          />
         
          <button
            className='submit-button rounded-sm bg-orange-500 text-white w-full h-10 mt-4'
            type='submit'
          >
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
