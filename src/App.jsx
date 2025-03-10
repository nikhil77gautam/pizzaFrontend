import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import MainApp from "./MainApp";
import { useRef, useState } from "react";

import Cartpage from "./Componant/Cartpage";
import Login from "./Componant/Login";
import Ragistration from "./Componant/Ragistration";
import PizzaDeliveryForm from "./Componant/PizzaDeliveryForm";
import UserProfile from "./Componant/UserProfile";
import AboutPage from "./page/AboutPage";
import ServicePage from "./page/ServicePage";
import ContactUsPage from "./page/ContactUsPage";
import Navigation2 from "./Componant/Navigation2";
import UserOrderHistory from "./Componant/UserOrderHistory";

const App = () => {

  return (
    <>
      <div className="flex flex-col min-w-screen">
        <Router>
          <Navigation2  />
          <Routes>
            <Route
              path="/"
              element={<MainApp  />}
            />
            <Route
              path="/cart"
              element={<Cartpage/>}
            />
            <Route path="/registration" element={<Ragistration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/PizzaDeliveryForm"
              element={<PizzaDeliveryForm  />}
            />
            <Route path="/HistoryPage" element={<UserOrderHistory />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/ServicePage" element={<ServicePage />} />
            <Route path="/ContactUsPage" element={<ContactUsPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
