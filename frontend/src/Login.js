import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import './Login.css'; 

function Login() {
  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const emailDomain = "@psn.co.id";
  const fullEmail = emailPrefix ? `${emailPrefix}${emailDomain}` : "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://nmc.psn.co.id:4000/login", { email: fullEmail, password });
      localStorage.setItem("email", fullEmail);
      localStorage.setItem("password", password);
      navigate("/Daily-Activity");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="card p-5 shadow-lg"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-center title">Welcome Back, NMC Team</h2>
        <p className="text-center text-light">Please log in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label text-light">Email</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="(e.g., mochamad.dandi)"
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value)}
                required
              />
              <span className="input-group-text">{emailDomain}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <motion.button 
            type="submit" 
            className="login-btn w-100"  
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 1.2 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
          <motion.div 
            className="text-center mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          >
            <motion.a 
              href="https://cboss.psn.co.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-link text-light"
              whileHover={{ scale: 1.1, color: "#3498db" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1.2 }}
            >
              Login to CBOSS
            </motion.a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
