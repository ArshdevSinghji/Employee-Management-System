const { Employee } = require("../models/Employee");
const { Manager } = require("../models/Manager");

exports.getAllEmployees = async (req, res) => {
  try {
    const employee = (await Employee.find()).filter(
      (employee) => employee.branch === req.user.branch,
    );
    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      const manager = await Manager.findById(req.params.id);
      if (!manager) {
        return res.status(404).json({ msg: "Employee not found" });
      }
      return res.status(200).json(manager);
    } else {
      return res.status(200).json(employee);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      ...req.body,
      branch: req.user.branch,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body, // Update employee with data from the request
      { new: true }, // Return the updated document
    );

    if (!updatedEmployee) {
      const updatedManager = await Manager.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedManager) {
        return res.status(404).json({ msg: "Employee not found" });
      } else {
        return res.status(200).json(updatedManager);
      }
    } else {
      return res.status(200).json(updatedEmployee);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send("Employee deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
