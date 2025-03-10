import React from 'react';

const Footer = () => {
  return (
    <div 
      className='footer-main w-full mt-4 pt-4 lg:mt-0.5 pb-4 h-auto text-orange-400' 
      style={{ 
        backgroundImage: 'url(https://i.pinimg.com/564x/46/23/3f/46233f969bbfe40b5a8f5fe321e63f37.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      <div className="footer w-full flex flex-col md:flex-row pl-5 md:pl-0">
        <div className="w-full md:w-1/4 md:pl-3 mb-4 md:mb-0">
          <h2 className='py-5 font-medium underline'>Useful Links</h2>
          <ul className='space-y-2 text-sm'>
            <li>Shipping policy</li>
            <li>Refund Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Promo codes</li>
          </ul>
        </div>
       
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className='py-5 font-medium underline'>Contact Us</h2>
          <ul className='space-y-2 text-sm'>
            <h4>Email:</h4>
            <li><a href="mailto:nagarsourabh@gmail.com">abc@gmail.com</a></li>
            <h4>Phone:</h4>
            <li><a href="tel:+919755908010">9876543210</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h2 className='py-5 font-medium underline'>Follow Us</h2>
          <ul className='space-y-2 text-sm'>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer;
