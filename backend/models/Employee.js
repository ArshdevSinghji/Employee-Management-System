const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Employee",
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
});

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

exports.Employee = mongoose.model("Employee", EmployeeSchema);
