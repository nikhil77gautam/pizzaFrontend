import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PizzaDeliveryForm = () => {
  const [formData, setFormData] = useState({
    addressId: "",
    deliveryInstructions: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cartDetails, setCartDetails] = useState({ cartId: "" });
  const [Userinfo, setUserinfo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartRes = await axios.get(`http://localhost:8000/getcartpizza/${customerId}`, {
          headers: { Authorization: localStorage.getItem("authToken") },
        });
        setCartDetails({ cartId: cartRes.data.cart._id });

        const addressRes = await axios.get(`http://localhost:8000/getUserInfo/${customerId}`);
        setUserinfo(addressRes.data.data);
        setShowForm(addressRes.data.data.address.length === 0);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchCartDetails();
  }, [customerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setStates(State.getStatesOfCountry(selectedCountry));
    setCities([]);
    setFormData({ ...formData, country: selectedCountry, state: "", city: "" });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setCities(City.getCitiesOfState(formData.country, selectedState));
    setFormData({ ...formData, state: selectedState, city: "" });
  };

  const handleAddressChange = (e) => {
    const selectedAddress = Userinfo.address.find((addr) => addr._id === e.target.value);
    if (selectedAddress) {
      setFormData({
        ...formData,
        addressId: selectedAddress._id,
        country: selectedAddress.country,
        state: selectedAddress.state,
        city: selectedAddress.city,
        pinCode: selectedAddress.postalCode,
        deliveryInstructions: selectedAddress.deliveryInstructions || "",
      });
    }
  };

  const handleAddNewAddress = () => {
    setShowForm(true);
    setFormData({
      addressId: "",
      deliveryInstructions: "",
      country: "",
      state: "",
      city: "",
      pinCode: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.addressId && (!formData.country || !formData.state || !formData.city || !formData.pinCode)) {
      toast.error("Please fill all required fields or select an address.");
      return;
    }

    try {
      const selectedAddress = Userinfo.address.find((addr) => addr._id === formData.addressId);

      const orderData = {
        customer: customerId,
        cartid: [cartDetails.cartId],
        shippingAddress: {
          city: selectedAddress ? selectedAddress.city : formData.city,
          state: selectedAddress ? selectedAddress.state : formData.state,
          postalCode: selectedAddress ? selectedAddress.postalCode : formData.pinCode,
          country: selectedAddress ? selectedAddress.country : formData.country,
        },
        deliveryInstructions: formData.deliveryInstructions,
        // addressId: formData.addressId || null,
      };
      console.log("orderData",orderData)

      await axios.post("http://localhost:8000/placeOrder", orderData, {
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      toast.success("Order booked successfully!");
      navigate("/HistoryPage");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <div
      className="mx-auto px-4 pt-8 text-orange-400"
      style={{
        backgroundImage: "url(image-url)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <ToastContainer />

     <div className="bg-gray-200 pt-5 pb-20 mx-60 border shadow-inner shadow-black rounded-2xl ">
     <h2 className="text-3xl font-extrabold mb-8 text-center text-white">Pizza Delivery Form</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-2xl ">
        {Userinfo.address && Userinfo.address.length > 0 && !showForm ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Select Existing Address</label>
              <select
                id="existingAddress"
                name="existingAddress"
                onChange={handleAddressChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Address</option>
                {Userinfo.address.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.city}, {address.state}, {address.country} - {address.postalCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
              <textarea
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <button
              type="button"
              onClick={handleAddNewAddress}
              className="mb-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition w-full"
            >
              Add New Address
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-between space-x-4 mb-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
              <textarea
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
     </div>
  );
};

export default PizzaDeliveryForm;
