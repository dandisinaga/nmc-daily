import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function SendEmail() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const recipientEmail = "group.nmc@psn.co.id";

  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://server.nmcpsn.my.id/send-email", {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        to: recipientEmail,
        subject,
        message,
      });
      setSubject("");
      setMessage("");
      setStatus("✅ Email sent successfully!");
      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("❌ Failed to send email. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f4f7fc" }}>
      <motion.div 
        className="p-5 shadow-lg d-flex flex-column align-items-center w-100" 
        style={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src="/logonmc1.png" 
          alt="Logo" 
          style={{ width: "200px", borderRadius: "10px" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <h2 className="text-center" style={{ color: "#2c3e50", fontWeight: "bold" }}>Halo NMC Team!</h2>
        <p className="text-center text-muted">Silakan submit daily activity kamu sebelum pulang</p>

        {status && (
          <motion.div 
            className={`alert ${status.includes("✅") ? "alert-success" : "alert-danger"} text-center`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {status}
          </motion.div>
        )}

        <form onSubmit={handleSendEmail} className="w-50">
          <input type="email" className="form-control mb-3" value={recipientEmail} readOnly />
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Enter email subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required
          />
          <textarea 
            className="form-control mb-3" 
            placeholder="Input your daily activity" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
            rows="5"
          ></textarea>
          <motion.button 
            type="submit" 
            className="btn w-100" 
            disabled={!subject || !message}
            style={{ backgroundColor: "#3498db", color: "white", fontWeight: "bold" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>
        <motion.button 
          className="btn btn-danger w-50 mt-3" 
          onClick={() => navigate("/logout")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default SendEmail;
