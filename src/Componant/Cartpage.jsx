import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "./Redux/getCartSlice";

const Cartpage = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const { userCart, loading, error } = useSelector((state) => state.userCart);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (userCart && userCart.cart) {
      const initialQuantities = {};
      if (userCart.cart.pizzas) {
        userCart.cart.pizzas.forEach((item) => {
          initialQuantities[item.pizza._id] = item.quantity;
        });
      }
      if (userCart.cart.meals) {
        userCart.cart.meals.forEach((item) => {
          initialQuantities[item.meal._id] = item.quantity;
        });
      }
      setQuantities(initialQuantities);
    }
  }, [userCart]);

  const customerId = localStorage.getItem("customerId");

  const updateCartQuantity = async (id, newQuantity) => {
    try {
      await axios.put(
        `https://pizzabackend-0x3r.onrender.com/${customerId}/${id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(getUserCart());
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const handleIncrement = (id) => {
    const newQuantity = (quantities[id] || 1) + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    updateCartQuantity(id, newQuantity);
  };

  const handleDecrement = (id) => {
    const newQuantity = Math.max((quantities[id] || 1) - 1, 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    updateCartQuantity(id, newQuantity);
  };

  const removeFromCart = async (id) => {
    try {
      await axios.post(
        "https://pizzabackend-0x3r.onrender.com/deletecartpizza",
        {
          customerId,
          Id: id,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(getUserCart());
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center py-10 px-4"
      style={{
        backgroundImage:
          "url(https://th.bing.com/th/id/OIP.sdUT21iwISmJm4IFVSpzGgHaOl?pid=ImgDet&w=161&h=316&c=7)",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {!userCart ||
            !userCart.cart ||
            (!userCart.cart.pizzas.length && !userCart.cart.meals.length) ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div>
                {userCart.cart.pizzas && userCart.cart.pizzas.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Pizzas
                    </h2>
                    {userCart.cart.pizzas.map((item) => (
                      <div
                        key={item.pizza._id}
                        className="flex items-center border-b py-4"
                      >
                        <img
                          src={`https://pizzabackend-0x3r.onrender.com/${item.pizza.image}`}
                          alt={item.pizza.title}
                          className="w-20 h-20 rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {item.pizza.title}
                          </h2>
                          <p className="text-gray-600">
                            Quantity:{" "}
                            {quantities[item.pizza._id] || item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center bg-orange-500 rounded-lg">
                          <button
                            className="p-2 text-white font-bold w-10 h-10"
                            onClick={() => handleDecrement(item.pizza._id)}
                          >
                            -
                          </button>
                          <div className="p-2 text-white font-bold w-10 h-10 flex items-center justify-center">
                            {quantities[item.pizza._id] || item.quantity}
                          </div>
                          <button
                            className="p-2 text-white font-bold w-10 h-10"
                            onClick={() => handleIncrement(item.pizza._id)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-orange-600 font-semibold mx-4">
                          ₹{item.pizza.price}
                        </p>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.pizza._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {userCart.cart.meals && userCart.cart.meals.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Meals
                    </h2>
                    {userCart.cart.meals.map((item) => (
                      <div
                        key={item.meal._id}
                        className="flex items-center border-b py-4"
                      >
                        <img
                          src={`https://pizzabackend-0x3r.onrender.com/${item.meal.image}`}
                          alt={item.meal.title}
                          className="w-20 h-20 rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {item.meal.title}
                          </h2>
                          <p className="text-gray-600">
                            Quantity:{" "}
                            {quantities[item.meal._id] || item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center bg-orange-500 rounded-lg">
                          <button
                            className="p-2 text-white font-bold w-10 h-10"
                            onClick={() => handleDecrement(item.meal._id)}
                          >
                            -
                          </button>
                          <div className="p-2 text-white font-bold w-10 h-10 flex items-center justify-center">
                            {quantities[item.meal._id] || item.quantity}
                          </div>
                          <button
                            className="p-2 text-white font-bold w-10 h-10"
                            onClick={() => handleIncrement(item.meal._id)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-orange-600 font-semibold mx-4">
                          ₹{item.meal.price}
                        </p>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.meal._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center text-xl">
                  <p className="font-semibold">Total Amount:</p>
                  <p className="font-semibold text-orange-600">
                    ₹{userCart.totalAmount}
                  </p>
                </div>

                <Link to="/PizzaDeliveryForm">
                  <button className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
