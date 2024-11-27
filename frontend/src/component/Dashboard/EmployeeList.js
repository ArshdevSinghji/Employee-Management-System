import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../style/EmployeeList.css';
import { LoginContext } from '../context/LoginContext';

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({
    name: '',
    email: '',
    role: '',
    branch: '',
    department: '',
    salary: ''
  });

  const { loggedIn, role } = useContext(LoginContext);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employee', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setEmployeeList(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${loggedIn}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployee();
    fetchCurrentUser();
  }, [loggedIn]);

  const handleEdit = (employee) => {
    setIsEditing(employee._id);
    setEditEmployeeData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      branch: employee.branch,
      department: employee.department,
      salary: employee.salary
    });
  };

  const handleSave = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editEmployeeData),
      });
      setEmployeeList(employeeList.map((employee) =>
        employee._id === id ? { ...employee, ...editEmployeeData } : employee
      ));
      setIsEditing(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployeeList(employeeList.filter((employee) => employee._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const getBranchEmployeeCount = () => {
    if (currentUser) {
      return employeeList.filter(employee => employee.branch === currentUser.branch).length;
    }
    return 0;
  };

  console.log(currentUser);

  return (
    <div className="dashboard">
      <div className="column">
        <div className="user-details">
          <div className='border-bottom'>
            <h2><span>{currentUser ? currentUser.name : 'You are logged out'}</span></h2>
            <p>{currentUser ? currentUser.email : 'You are logged out'}</p>
          </div>
          <div className='user-grid border-bottom'>
            <div>
              <p>Role:</p>
              <p>Branch:</p>
            </div>
            <div>
              <p>{currentUser ? currentUser.role : 'You are logged out'}</p>
              <p>{currentUser ? currentUser.branch : 'You are logged out'}</p>
            </div>
            <div>
              <p>Department:</p>
              <p>Salary:</p>
            </div>
            <div>
              <p>{currentUser ? currentUser.department : 'You are logged out'}</p>
              <p>{currentUser ? currentUser.salary : 'You are logged out'}</p>
            </div>
          </div>
          <div className='user border-bottom'>
            <p>Employee in this branch:</p>
            <FontAwesomeIcon icon={faUser} />
            <div className="count-badge">
              {getBranchEmployeeCount()}
            </div>
          </div>
        </div>
      </div>
      {
        role==="Employee"?(<div> You are not authorized to see employee list.</div>):(<div className="column">
          <h2>Employee List</h2>
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
                name="department"
                value={isEditing === employee._id ? editEmployeeData.department : employee.department}
                onChange={handleChange}
                className={isEditing === employee._id ? 'highlighted-input' : 'plain-input'}
                readOnly={isEditing !== employee._id}
              />
            </div>
            <div>
              <input
                type="text"
                name="salary"
                value={isEditing === employee._id ? editEmployeeData.salary : employee.salary}
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
    </div>)
      }
        
    </div>
  );
};

export default EmployeeList;