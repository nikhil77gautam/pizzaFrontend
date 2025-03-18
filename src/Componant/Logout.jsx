import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove authentication tokens & user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("customerId");

    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-lg font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;
