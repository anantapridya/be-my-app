const express = require("express");
const cors = require("cors");
const authRoutes = require("./app/routes/auth.routes");
const userSessionRoutes = require("./app/routes/user.routes");
const messageRoutes = require("./app/routes/message.routes");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userSessionRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });