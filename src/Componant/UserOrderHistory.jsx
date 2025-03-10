import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOrderUsers } from "./Redux/getOrderSlice.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { ListGroup } from "react-bootstrap";

// Rating Component for the entire order
const OrderRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    onRatingSubmit(rating, comment);
    setRating(0); // Reset after submission
    setComment(""); // Reset comment
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={rating >= star ? solidStar : regularStar}
            className="cursor-pointer text-yellow-500"
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
      <textarea
        className="border rounded p-2 mb-2"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded px-3 py-1"
      >
        Submit
      </button>
    </div>
  );
};

// User Order History Component
const UserOrderHistory = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [showPending, setShowPending] = useState(true);

  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.userOrders);
  console.log("userOrders",userOrders)

  useEffect(() => {
    dispatch(getOrderUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userOrders && Array.isArray(userOrders.customerDetails)) {
      const pending = userOrders.customerDetails.filter(
        (order) =>
          order.orderStatus === "Pending" ||
          order.orderStatus === "Confirmed" ||
          order.orderStatus === "Out for Delivery"
      );
      const delivered = userOrders.customerDetails.filter(
        (order) => order.orderStatus === "Delivered"
      );
      setPendingOrders(pending);
      setDeliveredOrders(delivered);
    }
  }, [userOrders]);

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.post("http://localhost:8000/deleteOrders", {
          orderId: orderId,
        });
        dispatch(getOrderUsers());
      } catch (error) {
        console.error("Error removing order:", error.message);
      }
    }
  };

  const submitOrderRating = async (rating, comment, orderId ,customerId) => {
    try {
      await axios.post("http://localhost:8000/createReview", {
        orderId: orderId,
        customerId:customerId,
        rating: rating,
        comment: comment,
      });
      alert("Rating and comment submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error.message);
      alert("Failed to submit rating.");
    }
  };

  const OrderCard = ({ order }) => {
    const totalAmount = order.cartDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return (
      <div className="bg-white p-6 mb-6 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> {order.orderStatus}
            </p>
            <button
              onClick={() => deleteOrder(order._id)}
              className="mt-2 bg-red-500 text-white rounded px-3 py-1"
            >
              Delete Order
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Shipping Address:</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>
              {order.shippingAddress.country} - {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Delivery Instructions:</span>{" "}
            {order.deliveryInstructions}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Products</h3>
          {order.cartDetails.map((item, index) => (
            <div key={index} className="mt-2 p-3 border rounded-lg shadow-sm bg-gray-50">
              <p className="text-gray-700">
                <span className="font-semibold">Item Name:</span> {item.title}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Quantity:</span> {item.quantity}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Price:</span> ₹{item.price * item.quantity}
              </p>
              {/* Display Eating Preferences */}
              {item.eatingPreference && (
                <p className="text-gray-700">
                  <span className="font-semibold">Eating Preference:</span> {item.eatingPreference}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold text-gray-800">
            Total Amount: ₹{totalAmount}
          </p>
        </div>
        {/* Order Rating Component */}
        <OrderRating onRatingSubmit={(rating, comment) => submitOrderRating(rating, comment, order._id , order.customer )} />
      </div>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
        Order History
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowPending(true)}
          className={`px-6 py-3 rounded-l-full transition-colors duration-300 ${
            showPending
              ? "bg-yellow-600 text-white"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => setShowPending(false)}
          className={`px-6 py-3 rounded-r-full transition-colors duration-300 ${
            !showPending
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
        >
          Delivered Orders
        </button>
      </div>

      {showPending ? (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-700">
            Pending Orders
          </h2>
          {pendingOrders.length === 0 ? (
            <p className="text-center text-gray-500">
              No pending orders found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pendingOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-green-700">
            Delivered Orders
          </h2>
          {deliveredOrders.length === 0 ? (
            <p className="text-center text-gray-500">
              No delivered orders found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deliveredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default UserOrderHistory;
