const RoleMiddleware = (roles) => (req, res, next) => {
  try {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

module.exports = RoleMiddleware;
