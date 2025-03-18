import React, { useState, useEffect } from "react";
import { FaCartPlus, FaUser, FaBars, FaSearch, FaBell } from "react-icons/fa"; // FaBell icon import kiya
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
import { getUserCart } from "./Redux/getCartSlice";
import { useDispatch, useSelector } from "react-redux";

const Navigation2 = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [notifications, setNotifications] = useState(5); // Notification count ke liye state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userCart } = useSelector((state) => state.userCart);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (userCart && userCart.cart) {
      const totalCartItems =
        userCart.cart.meals?.length + userCart.cart.pizzas?.length;
      setCartLength(totalCartItems);
    }
  }, [userCart]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("customerId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gray-700 flex items-center justify-between p-4">
        <div
          className="text-2xl text-white cursor-pointer md:hidden"
          onClick={menuToggle}
        >
          <FaBars className="my-3" />
        </div>

        <Link to="/" className="text-2xl font-bold text-yellow-300">
          PizzaMania
        </Link>

        <ul
          className={`fixed inset-0 flex flex-col items-center justify-center bg-gray-900 md:bg-transparent md:static md:flex-row md:space-x-8 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <li>
            <Link to="/" className="text-lg text-gray-100 dark:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/AboutPage"}
              className="text-lg text-gray-100 dark:text-white"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/ServicePage"}
              className="text-lg text-gray-100 dark:text-white"
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              to={"/ContactUsPage"}
              className="text-lg text-gray-100 dark:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center">
          {/* Search Input */}
          <div className="hidden md:flex text-white pr-2 items-center">
            <input
              className="rounded-sm w-full h-8 px-2 bg-white border border-gray-300"
              placeholder="Search your pizzas"
            />
          </div>

          {/* Mobile Search Icon */}
          <div className="md:hidden text-lg text-white pr-4">
            <FaSearch />
          </div>

          {/* Notification Icon with Badge */}
          <div className="relative text-white text-lg pr-4">
            <FaBell />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications}
              </span>
            )}
          </div>

          {/* Cart Icon with Badge */}
          <Link to={"/cart"} className="text-white text-lg pr-4 relative">
            <FaCartPlus />
            {cartLength > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cartLength}
              </span>
            )}
          </Link>

          {/* User Icon and Dropdown */}
          <div className="relative">
            <FaUser
              className="text-white text-lg cursor-pointer"
              onClick={() => setNavOpen(!navOpen)}
            />
            {navOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to={"/UserProfile"}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Profile
                </Link>
                <Link
                  to={"/HistoryPage"}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Order History
                </Link>
                {isLoggedIn ? (
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && <Sidenav menuToggle={menuToggle} />}
      </header>
    </>
  );
};

export default Navigation2;
