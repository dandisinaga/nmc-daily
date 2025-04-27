import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear stored email & password
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    // Redirect to login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center">
        <h2>Logging out...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  );
}

export default Logout;
