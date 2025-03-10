import React from 'react'

const ServicePage = () => {

      return (
        <div className="bg-gray-100 min-h-screen py-10">
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Our Services</h1>
            
            {/* <div className="mb-8">
              <img
                src="https://via.placeholder.com/800x400"
                alt="Our Services"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div> */}
    
            <p className="text-gray-700 text-lg leading-7 mb-6">
              At our pizzeria, we are dedicated to delivering the best pizza experience to our customers. Our services go beyond just making pizzas; we strive to provide an unforgettable dining experience.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Home Delivery</h2>
            <p className="text-gray-700 text-lg leading-7 mb-6">
              Enjoy your favorite pizza from the comfort of your home with our fast and reliable home delivery service. Our delivery team ensures that your pizza arrives hot and fresh every time.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dine-In Experience</h2>
            <p className="text-gray-700 text-lg leading-7 mb-6">
              Visit our restaurant for a cozy and inviting dine-in experience. Whether it's a casual lunch or a special dinner, our friendly staff is here to make your meal memorable.
            </p>
    
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Catering</h2>
            <p className="text-gray-700 text-lg leading-7 mb-6">
              Planning an event? Let us handle the food! We offer catering services for all types of events, ensuring that your guests enjoy delicious pizzas, salads, and more.
            </p>
    
            <div className="mt-8 text-center">
              <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-red-700 transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    
export default ServicePage
