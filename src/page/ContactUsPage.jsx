import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Contact Us</h1>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            If you have any questions or need further assistance, please feel free to reach out to us through the following methods:
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Email:</strong> abc@example.com
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Phone:</strong> 9876543210
          </p>
          <p className="text-lg text-gray-700">
            <strong>Address:</strong> 123 Example Street, Example City, EX 12345
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
          <p className="text-lg text-gray-700">
            Monday - Friday: 9:00 AM - 5:00 PM
          </p>
          <p className="text-lg text-gray-700">
            Saturday: 10:00 AM - 3:00 PM
          </p>
          <p className="text-lg text-gray-700">
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
