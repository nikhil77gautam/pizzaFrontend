import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidenav = ({ menuToggle }) => {
  return (
    <div className="sidenav mt-20 fixed inset-0 bg-gray-700 bg-opacity-90 z-50 h-full w-full md:hidden">
      {/* Close icon positioned in the top-right corner */}
      <FaTimes className='absolute top-4 right-4 text-white cursor-pointer text-2xl' onClick={menuToggle} />

      <ul className='bg-gray-500 space-y-4 pt-10 pb-10 text-xl font-bold h-auto'>
        <li className='px-5'>
          <Link to={"/"} className='text-white' onClick={menuToggle}>HOME</Link>
        </li>
        <hr className='bg-white h-[0.130rem]' />
        <li className='px-5'>
          <Link to={"/AboutPage"} className='text-white' onClick={menuToggle}>ABOUT</Link>
        </li>
        <hr className='bg-white h-[0.130rem]' />
        <li className='px-5'>
          <Link to={"/ServicePage"} className='text-white' onClick={menuToggle}>SERVICE</Link>
        </li>
        <hr className='bg-white h-[0.130rem]' />
        <li className='px-5'>
          <Link to={"/ContactUsPage"} className='text-white' onClick={menuToggle}>CONTACT</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
