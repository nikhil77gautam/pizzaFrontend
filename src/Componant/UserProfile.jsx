import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './Redux/getUserProfileSlice'; // Make sure this path is correct

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfiles.profile);
  const loading = useSelector((state) => state.userProfiles.loading);
  const error = useSelector((state) => state.userProfiles.error);

  useEffect(() => {
    const customerId = localStorage.getItem('customerId'); // Fetch the customerId from localStorage
    dispatch(fetchUserProfile(customerId)); // Dispatch the thunk action with customerId
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg rounded-lg mt-12 sm:mt-20">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white overflow-hidden shadow-md">
          <img
            src={userProfile?.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          {userProfile?.name || 'User Name'}
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {/* Email */}
        <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
          <p className="font-semibold">Email:</p>
          <p className="text-sm sm:text-lg">{userProfile?.email || 'email@example.com'}</p>
        </div>

        {/* Phone Number */}
        <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
          <p className="font-semibold">Phone Number:</p>
          <p className="text-sm sm:text-lg">{userProfile?.phoneNumber || '+1 234 567 890'}</p>
        </div>

        {/* Multiple Addresses */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Addresses:</h3>
          {userProfile?.address?.length > 0 ? (
            userProfile.address.map((addr, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md mb-4"
              >
                <p><strong>Address {index + 1}:</strong></p>
                <p className="text-sm sm:text-base"><strong>City:</strong> {addr.city || 'City Name'}</p>
                <p className="text-sm sm:text-base"><strong>State:</strong> {addr.state || 'State Name'}</p>
                <p className="text-sm sm:text-base"><strong>Country:</strong> {addr.country || 'Country Name'}</p>
                <p className="text-sm sm:text-base"><strong>Postal Code:</strong> {addr.postalCode || 'Postal Code'}</p>
              </div>
            ))
          ) : (
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md mb-4">
              <p><strong>Address 1:</strong></p>
              <p className="text-sm sm:text-base"><strong>City:</strong> City Name</p>
              <p className="text-sm sm:text-base"><strong>State:</strong> State Name</p>
              <p className="text-sm sm:text-base"><strong>Country:</strong> Country Name</p>
              <p className="text-sm sm:text-base"><strong>Postal Code:</strong> Postal Code</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      {/* Uncomment if you want to include an edit button */}
      {/* <div className="mt-8 text-center">
        <button className="bg-white text-indigo-500 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
          Edit Profile
        </button>
      </div> */}
    </div>
  );
};

export default UserProfile;
