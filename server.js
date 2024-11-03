const express = require("express");
const cors = require("cors");
const authRoutes = require("./app/routes/auth.routes");
const userSessionRoutes = require("./app/routes/user.routes");
const messageRoutes = require("./app/routes/message.routes");
const db = require("./app/models");

const app = express();

// CORS options
const corsOptions = {
  origin: ["http://localhost:3000"], // Add your frontend URL here
  credentials: true,
};

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userSessionRoutes);
app.use("/api/message", messageRoutes);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// const mongoose = require("mongoose");
// const dbConfig = require("./config/db.config");

// Function to connect to the database
// async function connectDB() {
//   try {
//     await db.mongoose.connect(db.url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Adjust if necessary
//     });
//     console.log("Connected to the database!");
//   } catch (err) {
//     console.error("Cannot connect to the database!", err);
//     throw err; // Allow this error to bubble up for handling in the request
//   }
// }

// // Export the handler for Vercel
// module.exports = async (req, res) => {
//   try {
//     // Connect to the database on the first request
//     if (!db.mongoose.connection.readyState) {
//       await connectDB();
//     }
//     console.log("Processing request:", req.method, req.url);
//     // Handle the request
//     app(req, res);
//   } catch (err) {
//     console.error("Request failed:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
