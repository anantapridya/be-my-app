const jwt = require("jsonwebtoken");
const SECRET_KEY = "iniadalahscrtkey";

exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "empty token" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "expired token" });
    req.user = user;
    next();
  });
};
