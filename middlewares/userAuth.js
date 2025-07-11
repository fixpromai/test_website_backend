const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token =
    req.cookies.fixpromToken || 
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1]); 

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = userAuth;
