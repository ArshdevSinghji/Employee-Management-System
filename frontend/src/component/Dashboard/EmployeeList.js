import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../../style/EmployeeList.css";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({
    name: '',
    email: '',
    role: '',
    branch: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employee", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setEmployeeList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployee();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployeeList(employeeList.filter((employee) => employee._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (employee) => {
    setIsEditing(employee._id);
    setEditEmployeeData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      branch: employee.branch,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData({ ...editEmployeeData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editEmployeeData),
      });
      setIsEditing(null);
      setEmployeeList(employeeList.map(emp =>
        emp._id === id ? { ...emp, ...editEmployeeData } : emp
      ));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div>
      <h1>Employee List</h1>
      <div className="row-layout">
        {employeeList.map((employee) => (
          <div key={employee._id} className="row-item">
            <div>
              <input
                type="text"
                name="name"
                value={isEditing === employee._id ? editEmployeeData.name : employee.name}
                onChange={handleChange}
                className={isEditing === employee._id ? 'highlighted-input' : 'plain-input'}
                readOnly={isEditing !== employee._id}
              />
              </div>
            <div>
              <input
                type="text"
                name="email"
                value={isEditing === employee._id ? editEmployeeData.email : employee.email}
                onChange={handleChange}
                className={isEditing === employee._id ? 'highlighted-input' : 'plain-input'}
                readOnly={isEditing !== employee._id}
              />
            </div>
            <div>
              <input
                type="text"
                name="role"
                value={isEditing === employee._id ? editEmployeeData.role : employee.role}
                onChange={handleChange}
                className={isEditing === employee._id ? 'highlighted-input' : 'plain-input'}
                readOnly={isEditing !== employee._id}
              />
            </div>
            <div>
              <input
                type="text"
                name="branch"
                value={isEditing === employee._id ? editEmployeeData.branch : employee.branch}
                onChange={handleChange}
                className={isEditing === employee._id ? 'highlighted-input' : 'plain-input'}
                readOnly={isEditing !== employee._id}
              />
            </div>
            <div>
              {isEditing === employee._id ? (
                <>
                  <button onClick={() => handleSave(employee._id)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(employee)}><FontAwesomeIcon icon={faPen} /></button>
                  <button onClick={() => handleDelete(employee._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
