```markdown
# To-Do List Application Documentation

## 1. Project Overview
The To-Do List application is a full-stack web application designed to help users manage their daily tasks efficiently. The backend is developed using Node.js and Express, and it uses MongoDB Atlas for cloud storage. The application is containerized using Docker and deployed on Render for easy access and testing.

Test this backend project using Postman with the provided URLs. Since it uses cookies to store the authentication token (containing user_id and email), ensure that cookies are properly managed, as they are required for middleware authentication.

Live API Link: https://todolist-v1-ikyj.onrender.com

DockerHub Image: pankajs53/todolist:v1

---
## 2. Features Implemented

### 2.1 Authentication & Authorization
- **User Registration & Login:** Implemented authentication using JWT (JSON Web Token).
- **Cookies & Token Management:** The authentication token is stored in HTTP-only cookies for secure session management.
- **Middleware for Protected Routes:** Created middleware to extract `userId` and `email` from the token before allowing access to protected endpoints.

### 2.2 Email Notifications using Nodemailer
- **Account Registration Emails:** Integrated Nodemailer to send welcome emails upon successful account creation.
- **Asynchronous Email Handling:** Email sending is handled asynchronously to ensure quick response times.

### 2.3 To-Do Management
- **Task Creation, Retrieval, Update, and Deletion:** Standard CRUD operations are implemented.
- **User-Task Relationship:** Instead of storing to-do references inside the user document, we store the user’s reference inside each to-do item. This improves scalability by keeping user documents lightweight and reducing nested updates.

---
## 3. Architectural Enhancements

### 3.1 Performance Improvements
- **Caching with Redis:** Future improvements can include caching frequently accessed tasks to reduce database queries.
- **Task Queuing with BullMQ:** Email notifications can be handled using a job queue to ensure reliable email delivery without slowing down API responses.
- **Soft Delete Functionality:** Instead of hard deleting tasks, a `deleteFlag` is used to mark tasks as deleted. This allows for data recovery and batch cleanup operations.

---
## 4. Deployment & Infrastructure

### 4.1 Dockerization
- The backend is containerized using **Docker**, making deployment and scaling easier.
- Docker ensures consistent environments across different systems.

### 4.2 Cloud Deployment
- The backend is deployed on **Render** (free tier). The first request may take up to **50 seconds** due to cold start issues, but subsequent requests are faster.
- **MongoDB Atlas** is used as the cloud database to store user and task information.

---
## 5. API Documentation & Testing

### 5.1 Postman API Documentation
#### Base URL: `https://todolist-v1-ikyj.onrender.com`
```
#### Authentication & To-Do Management
```http
# Login
POST https://todolist-v1-ikyj.onrender.com/api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# Register
POST https://todolist-v1-ikyj.onrender.com/api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Create Task
POST https://todolist-v1-ikyj.onrender.com/api/v1/todo/add
Content-Type: application/json
Cookie: token=JWT_TOKEN_HERE

{
  "title": "Complete Project Report",
  "description": "Prepare the final report and submit it before the deadline.",
  "status": "inprogress",
  "priority": "high",
  "dueDate": "2025-02-20"
}


# Get All Tasks
GET https://todolist-v1-ikyj.onrender.com/api/v1/todo/getAll
Cookie: token=JWT_TOKEN_HERE

#Get Task By id
GET https://todolist-v1-ikyj.onrender.com/api/v1/todo/:id

# Update Task
PUT https://todolist-v1-ikyj.onrender.com/api/v1/todo/update/:id
Content-Type: application/json
Cookie: token=JWT_TOKEN_HERE

{
  "title": "Updated Task"
}

# Delete Task
DELETE https://todolist-v1-ikyj.onrender.com/api/v1/todo/:id
Cookie: token=JWT_TOKEN_HERE
```
---
## 6. Future Improvements
- **Integrate Redis for caching** to reduce database load.
- **Use BullMQ for background job processing** to improve efficiency.
- **Implement WebSockets** for real-time task updates.
- **Introduce Role-Based Access Control (RBAC)** for better permission management.
- **Optimize database queries** to handle a large number of users efficiently.

This documentation provides an overview of the architecture, features, API usage, and future improvements for the To-Do List application.
```
