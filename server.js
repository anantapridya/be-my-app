const express = require("express");
const cors = require("cors");
const authRoutes = require("./app/routes/auth.routes");
const userSessionRoutes = require("./app/routes/user.routes");
const messageRoutes = require("./app/routes/message.routes");
const db = require("./app/models");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userSessionRoutes);
app.use("/api/message", messageRoutes);

// Flag to track if the database is connected
let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    try {
      db.mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Adjust if necessary
      });
      isConnected = true;
      console.log("Connected to the database!");
    } catch (err) {
      console.error("Cannot connect to the database!", err);
      throw err;
    }
  }
}

// Export the handler for Vercel
module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connectDB();
    }
    console.log("Processing request:", req.method, req.url);
    app(req, res); // Pass the request to the Express app
  } catch (err) {
    console.error("Request failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};
