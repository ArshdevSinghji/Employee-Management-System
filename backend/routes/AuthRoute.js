const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Manager } = require("../models/Manager");
const { Employee } = require("../models/Employee");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role, department, salary, branch } = req.body;
  try {
    if (role === "Manager") {
      const newManager = new Manager({
        name,
        email,
        password,
        role,
        department,
        salary,
        branch,
      });
      await newManager.save();
    } else {
      const newEmployee = new Employee({
        name,
        email,
        password,
        role,
        department,
        salary,
        branch,
      });
      await newEmployee.save();
    }
    res.status(200).send("User created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user is a Manager
    let user = await Manager.findOne({ email });
    if (!user) {
      // Check if user is an Employee
      user = await Employee.findOne({ email });
      if (!user) {
        return res.status(400).send("User does not exist");
      }
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Prepare payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        branch: user.branch,
      },
    };

    // Generate JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, id: user.id, role: user.role });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;
