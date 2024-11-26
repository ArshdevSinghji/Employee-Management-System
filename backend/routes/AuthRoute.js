const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Manager } = require("../models/Manager");
const { Employee } = require("../models/Employee");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role, branch } = req.body;
  try {
    if (role === "Manager") {
      const newManager = new Manager({
        name,
        email,
        password,
        role,
        branch,
      });
      await newManager.save();
    } else {
      const newEmployee = new Employee({
        name,
        email,
        password,
        role,
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
    const user = await Manager.findOne({ email });
    if (user.length === 0) {
      const employee = await Employee.findOne({ email });
      if (employee.length === 0) {
        return res.status(400).send("User does not exist");
      }
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
      const payload = {
        user: {
          id: employee.id,
          role: employee.role,
          branch: employee.branch,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        },
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        branch: user.branch,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
