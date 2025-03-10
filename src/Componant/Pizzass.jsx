import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getPizzas } from "./Redux/getPizzasSlice";
import { getmeals } from "./Redux/getMealsSlice";
import { getUserCart } from "./Redux/getCartSlice";
import { useDispatch, useSelector } from 'react-redux';

const Pizzass = ({ vegRef, nonVegRef, Beverages, Desserts }) => {
  const [quantities, setQuantities] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getHomePizza = useSelector((state) => state.getPizzas.homePizzas);
  const meals = useSelector((state) => state.getMeals.getMeals);
  console.log("getHomePizza",getHomePizza)
  console.log("meals",meals)

  useEffect(() => {
    // Fetch pizzas and meals only once on component mount
    dispatch(getPizzas());
    dispatch(getmeals());
    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    // Initialize quantities based on pizzas and meals
    const initialQuantities = {};

    getHomePizza.forEach((pizza) => {
      initialQuantities[pizza._id] = quantities[pizza._id] || 0;
    });
    meals.forEach((meal) => {
      initialQuantities[meal._id] = quantities[meal._id] || 0;
    });

    setQuantities(initialQuantities);
  }, [getHomePizza, meals]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  };

  const handleAddToCart = async (itemId, isPizza = true) => {
    if (!isAuthenticated) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    const customerId = localStorage.getItem("customerId");

    try {
      const response = await axios.post(
        "http://localhost:8000/addtocart",
        {
          [isPizza ? "pizzaId" : "mealId"]: itemId,
          customerId,
          quantity: quantities[itemId],
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Item successfully added to cart!");
        dispatch(getUserCart());
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error("Failed to add item to cart");
    }
  };

  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="md:mt-1 lg:mt-0">
      <ToastContainer />

      <div
        className="px-4 py-9 md:mt-0"
        style={{
          backgroundImage: "url(https://i.pinimg.com/originals/1e/45/c1/1e45c1d7218d6f5e469d185223e33beb.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Veg Pizzas Section */}
        <div ref={vegRef} className="category-section">
          <h2 className="text-2xl text-white mb-4">Veg Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getHomePizza
              .filter((pizza) => pizza.category === "veg")
              .map((pizza) => (
                <div
                  key={pizza._id}
                  className="card rounded-lg shadow-xl bg-gray-100 bg-opacity-20 transform transition duration-300 hover:scale-105"
                >
                  <div className="card-img pt-4 h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={`http://localhost:8000/${pizza.image}`}
                      alt={pizza.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="card-body p-4 flex flex-col items-center text-center space-y-4">
                    <div className="card-title font-bold text-xl text-white">
                      {pizza.title}
                    </div>
                    <div className="card-title font-medium text-white text-sm">
                      {pizza.description}
                    </div>
                    <hr className="card-divider w-full border-gray-300" />
                    <div className="card-footer flex justify-between items-center w-full text-white">
                      <div className="card-price text-2xl font-semibold">
                        ₹{pizza.price}
                      </div>
                      <div className="flex items-center bg-orange-500 rounded-lg">
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleDecrement(pizza._id)}
                        >
                          -
                        </button>
                        <div className="font-bold text-gray-100 w-8 h-8 flex items-center justify-center">
                          {quantities[pizza._id] || 0}
                        </div>
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleIncrement(pizza._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={`ml-4 flex items-center justify-center p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-10 h-10 ${quantities[pizza._id] === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleAddToCart(pizza._id, true)}
                        disabled={quantities[pizza._id] === 0}
                      >
                        <FaCartPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Non-Veg Pizzas Section */}
        <div ref={nonVegRef} className="category-section">
          <h2 className="text-2xl text-white mb-4">Non-Veg Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getHomePizza
              .filter((pizza) => pizza.category === "nonveg")
              .map((pizza) => (
                <div
                  key={pizza._id}
                  className="card rounded-lg shadow-xl bg-gray-100 bg-opacity-20 transform transition duration-300 hover:scale-105"
                >
                  <div className="card-img pt-4 h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={`http://localhost:8000/${pizza.image}`}
                      alt={pizza.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="card-body p-4 flex flex-col items-center text-center space-y-4">
                    <div className="card-title font-bold text-xl text-white">
                      {pizza.title}
                    </div>
                    <div className="card-title font-medium text-white text-sm">
                      {pizza.description}
                    </div>
                    <hr className="card-divider w-full border-gray-300" />
                    <div className="card-footer flex justify-between items-center w-full text-white">
                      <div className="card-price text-2xl font-semibold">
                        ₹{pizza.price}
                      </div>
                      <div className="flex items-center bg-orange-500 rounded-lg">
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleDecrement(pizza._id)}
                        >
                          -
                        </button>
                        <div className="font-bold text-gray-100 w-8 h-8 flex items-center justify-center">
                          {quantities[pizza._id] || 0}
                        </div>
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleIncrement(pizza._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={`ml-4 flex items-center justify-center p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-10 h-10 ${quantities[pizza._id] === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleAddToCart(pizza._id, true)}
                        disabled={quantities[pizza._id] === 0}
                      >
                        <FaCartPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Beverages and Desserts Sections */}
        <div ref={Beverages} className="category-section">
          <h2 className="text-2xl text-white mb-4">Beverages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals
              .filter((meal) => meal.category === "Beverages")
              .map((meal) => (
                <div
                  key={meal._id}
                  className="card rounded-lg shadow-xl bg-gray-100 bg-opacity-20 transform transition duration-300 hover:scale-105"
                >
                  <div className="card-img pt-4 h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={`http://localhost:8000/${meal.image}`}
                      alt={meal.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="card-body p-4 flex flex-col items-center text-center space-y-4">
                    <div className="card-title font-bold text-xl text-white">
                      {meal.title}
                    </div>
                    <div className="card-title font-medium text-white text-sm">
                      {meal.description}
                    </div>
                    <hr className="card-divider w-full border-gray-300" />
                    <div className="card-footer flex justify-between items-center w-full text-white">
                      <div className="card-price text-2xl font-semibold">
                        ₹{meal.price}
                      </div>
                      <div className="flex items-center bg-orange-500 rounded-lg">
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleDecrement(meal._id)}
                        >
                          -
                        </button>
                        <div className="font-bold text-gray-100 w-8 h-8 flex items-center justify-center">
                          {quantities[meal._id] || 0}
                        </div>
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleIncrement(meal._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={`ml-4 flex items-center justify-center p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-10 h-10 ${quantities[meal._id] === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleAddToCart(meal._id, false)}
                        disabled={quantities[meal._id] === 0}
                      >
                        <FaCartPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div ref={Desserts} className="category-section">
          <h2 className="text-2xl text-white mb-4">Desserts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals
              .filter((meal) => meal.category === "Desserts")
              .map((meal) => (
                <div
                  key={meal._id}
                  className="card rounded-lg shadow-xl bg-gray-100 bg-opacity-20 transform transition duration-300 hover:scale-105"
                >
                  <div className="card-img pt-4 h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={`http://localhost:8000/${meal.image}`}
                      alt={meal.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="card-body p-4 flex flex-col items-center text-center space-y-4">
                    <div className="card-title font-bold text-xl text-white">
                      {meal.title}
                    </div>
                    <div className="card-title font-medium text-white text-sm">
                      {meal.description}
                    </div>
                    <hr className="card-divider w-full border-gray-300" />
                    <div className="card-footer flex justify-between items-center w-full text-white">
                      <div className="card-price text-2xl font-semibold">
                        ₹{meal.price}
                      </div>
                      <div className="flex items-center bg-orange-500 rounded-lg">
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleDecrement(meal._id)}
                        >
                          -
                        </button>
                        <div className="font-bold text-gray-100 w-8 h-8 flex items-center justify-center">
                          {quantities[meal._id] || 0}
                        </div>
                        <button
                          className="font-extrabold text-gray-100 w-8 h-8"
                          onClick={() => handleIncrement(meal._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={`ml-4 flex items-center justify-center p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-10 h-10 ${quantities[meal._id] === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleAddToCart(meal._id, false)}
                        disabled={quantities[meal._id] === 0}
                      >
                        <FaCartPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizzass;
