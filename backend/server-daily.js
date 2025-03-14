const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const HOST = "nmc.psn.co.id"; // Change to your IP
const PORT = 4000;

// Store user sessions (temporary)
let userSessions = {}; 

// 🔹 LOGIN API (Authenticate user)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.psn.co.id",
      port: 587,
      secure: false,
      auth: { user: email, pass: password },
    });

    // Check if email & password are valid
    await transporter.verify();

    // Save user session
    userSessions[email] = password;

    res.json({ success: true, message: "Login successful!", email });
  } catch (error) {
    res.status(401).json({ success: false, message: "Email dan password tidak sesuai!" });
  }
});

// 🔹 SEND EMAIL API (Uses stored credentials)
app.post("/send-email", async (req, res) => {
  const { email, to, subject, message } = req.body;
  const password = userSessions[email]; // Get stored password

  if (!password) {
    return res.status(403).json({ message: "Unauthorized. Please log in again." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.psn.co.id",
      port: 587,
      secure: false,
      auth: { user: email, pass: password },
    });

    await transporter.sendMail({
      from: email,
      to,
      subject,
      text: message,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
