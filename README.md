**Employee Management System with RBAC**

**Detailed Project Guide**

-----
**1. Introduction**

The Employee Management System with RBAC (Role-Based Access Control) is a robust application designed to manage employees and branches efficiently while maintaining secure access based on roles.

- **Managers** can perform CRUD operations and oversee their branch employees.
- **Employees** have restricted access to only their data.

This document provides an extensive, step-by-step guide on running the system for users of all expertise levels.

-----
**2. Key Features Overview**

- **Role-Based Access**: Managers manage employees under their branch; employees have limited access to personal details.
- **Branch-Based Employee Management**: Each employee belongs to a branch, managed by a branch-specific manager.
- **Secure Authentication**: JWT ensures safe and encrypted communication.
- **Dynamic Interface**: Responsive UI for devices of all sizes.
-----
**3. Technologies Used**

**Backend:**

- **Node.js**: Fast and scalable runtime environment.
- **Express.js**: Web framework for creating APIs.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for MongoDB.

**Frontend:**

- **React.js**: Dynamic UI development.
- **Axios**: API communication.

**Authentication:**

- **JWT**: Secure token-based authentication.
- **bcrypt**: Password hashing for enhanced security.
-----
**4. Installation Guide**

**Step 1: Prerequisites**

Before starting, ensure you have the following:

- **Node.js** installed (preferably version 16+).
- **npm** (comes with Node.js).
- **MongoDB** installed and running locally or a cloud instance (e.g., MongoDB Atlas).

**Step 2: Clone the Repository**

1. Open your terminal or command prompt.
1. Clone the repository:

   bash

   Copy code

   git clone https://github.com/your-repo/employee-management-system.git

1. Navigate to the project folder:

   cd employee-management-system

**Step 3: Backend Setup**

1. Move to the backend directory:

   cd backend

1. Install dependencies:

   npm install

1. Create a .env file in the backend folder and configure:

   MONGODB\_URI=mongodb://localhost:27017/employeeDB

   JWT\_SECRET=your\_secret\_key

1. Start the backend server:

   npm start

   The server will run on http://localhost:5000 by default.

**Step 4: Frontend Setup**

1. Navigate to the frontend directory:

   cd ../frontend

1. Install dependencies:

   npm install

1. Create a .env file in the frontend folder and configure:

   REACT\_APP\_API\_URL=http://localhost:5000

1. Start the frontend server:

   npm start

   The frontend will run on http://localhost:3000 by default.

-----
**5. Testing and Running the Application**

**Accessing the Application**

- **Frontend**: Open http://localhost:3000.
- **Backend API**: Open http://localhost:5000 (for testing with tools like Postman).
-----
**6. API Endpoints**

**Authentication Routes (Public Access)**

1. **Login**:

   http

   Copy code

   POST /api/auth/login

   Request Body:

   { "email": "manager@example.com", "password": "123456789" }

   Response:

   { "token": "JWT\_TOKEN" }

1. **Register**:

   POST /api/auth/register

   Request Body:

   {

   `  `"name": "John Snow",

   `  `"email": "johnsnow@example.com",

   `  `"password": "123456789",

   `  `"role": "manager"

   }

-----
**Employee Management Routes**

**Get All Employees (Manager Only)**

GET /api/employee

Authorization: Bearer <JWT\_TOKEN>

Response:

[

`  `{ "id": "Object ID", "name": "Amit", "branch": "IT", "role": "employee" }

]

**Get Employee by ID (Manager/Employee)**

GET /api/employee/:id

Authorization: Bearer <JWT\_TOKEN>

Response:

{ "id": "E101", "name": "Amit", "branch": "IT", "role": "employee" }

**Create New Employee (Manager Only)**

POST /api/employee

Authorization: Bearer <JWT\_TOKEN>

Request Body:

{

`  `"name": "Amit",

`  `"email": "amit@gmail.com",

`  `"branch": "IT",

`  `"role": "employee",
`  `“salary”: “521”

}

**Update Employee by ID (Manager Only)**

PUT /api/employee/:id

Authorization: Bearer <JWT\_TOKEN>

Request Body:

{ "name": "Amit Updated" }

**Delete Employee by ID (Manager Only)**

DELETE /api/employee/:id

Authorization: Bearer <JWT\_TOKEN>

-----
**7. Project Directory Structure**

**Backend Directory**

backend

│

├── .vscode/

├── config/

│ └── database.js

├── controllers/

│ └── UserController.js

├── middleware/

│ ├── AuthMiddleware.js

│ └── RoleMiddleware.js

├── models/

│ ├── Employee.js

│ └── Manager.js

├── routes/

│ ├── AuthRoute.js

│ └── UserRoute.js

├── .env

├── .gitignore

├── package-lock.json

├── package.json

└── server.js

**Frontend Directory**

frontend
│
├── .vscode/
├── node\_modules/
├── public/
├── src/
│ ├── assets/
│ │ ├── data/
│ │ │ └── projectDetails.json
│ │ └── image/
│ ├── component/
│ │ ├── Auth/
│ │ │ ├── Login.js
│ │ │ ├── Logout.js
│ │ │ └── Registration.js
│ │ ├── context/
│ │ │ └── LoginContext.js
│ │ ├── Dashboard.js
│ │ ├── EmployeeList.js
│ │ ├── Navigation.js
│ │ └── ProjectDetails.js
│ ├── pages/
│ │ ├── Footer.js
│ │ ├── Home.js
│ │ └── Nav.js
│ ├── services/
│ │ └── api.js
│ ├── style/
│ ├── App.css
│ └── App.js
├── package-lock.json
└── package.json-----

**8. Troubleshooting**

- **Backend not starting**: Ensure MongoDB is running and .env is configured correctly.
- **Frontend API errors**: Check REACT\_APP\_API\_URL in the .env file and confirm it matches the backend URL.
-----
**9. Future Enhancements**

- **Branch Management**: Add functionality to dynamically manage branches.
- **Employee Performance Tracking**: Include KPIs and reports.
- **Mobile App**: Extend functionalities to mobile platforms.

This includes all core API routes and ensures clarity in usage for developers. Let me know if more details are required!

