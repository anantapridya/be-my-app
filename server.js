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

// Connect to MongoDB
async function connectDB() {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Cannot connect to the database!", err);
    throw err;
  }
}

// Export the app for Vercel
module.exports = async (req, res) => {
  if (!db.mongoose.connection.readyState) {
    await connectDB();
  }
  app(req, res); // Delegate request to Express app
};
