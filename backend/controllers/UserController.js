const { Employee } = require("../models/Employee");

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
    res.status(200).json(employee);
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
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json(updatedEmployee); // Send the updated employee back in the response
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
