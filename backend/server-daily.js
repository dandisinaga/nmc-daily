const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(express.json());

// Ganti ini ke domain frontend kamu
const FRONTEND_ORIGIN = "https://daily.nmcpsn.my.id";

// ✅ CORS Setup
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));

// ✅ Session Setup
app.use(session({
  secret: "super_secret_key_123", // ganti ke secret environment
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       // wajib pakai HTTPS
    httpOnly: true,     // agar tidak bisa diakses JS
    sameSite: "none",   // agar bisa cross-domain via cookie
    maxAge: 60 * 60 * 1000 // 1 jam
  }
}));

const PORT = process.env.PORT || 4000;

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.psn.co.id",
      port: 587,
      secure: false,
      auth: { user: email, pass: password },
    });

    await transporter.verify();

    // Simpan session
    req.session.email = email;
    req.session.password = password;

    res.json({ success: true, message: "Login berhasil!" });
  } catch (error) {
    console.error("Login gagal:", error.message);
    res.status(401).json({ success: false, message: "Email atau password salah." });
  }
});

// 🔐 Middleware session check
const isAuthenticated = (req, res, next) => {
  if (!req.session?.email || !req.session?.password) {
    return res.status(401).json({ message: "Belum login / session expired" });
  }
  next();
};

// 📤 SEND EMAIL
app.post("/send-email", isAuthenticated, async (req, res) => {
  const { to, subject, message } = req.body;
  const { email, password } = req.session;

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

    res.json({ message: "Email berhasil dikirim!" });
  } catch (err) {
    console.error("Gagal kirim:", err.message);
    res.status(500).json({ message: "Gagal mengirim email." });
  }
});

// 🚪 LOGOUT
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout berhasil" });
  });
});

// ✅ START SERVER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server berjalan di http://0.0.0.0:${PORT}`);
});
