```markdown
# To-Do List Application Documentation

## 1. Project Overview
The To-Do List application is a full-stack web application designed to help users manage their daily tasks efficiently. The backend is developed using Node.js and Express, and it uses MongoDB Atlas for cloud storage. The application is containerized using Docker and deployed on Render for easy access and testing.

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

#### Authentication
##### Login
```http
POST https://todolist-v1-ikyj.onrender.com/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```
##### Register
```http
POST https://todolist-v1-ikyj.onrender.com/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Registration successful"
}
```

#### To-Do Management
##### Create Task
```http
POST https://todolist-v1-ikyj.onrender.com/todos
Content-Type: application/json
Cookie: token=JWT_TOKEN_HERE

{
  "title": "New Task",
  "description": "Task details"
}
```
##### Get Tasks
```http
GET https://todolist-v1-ikyj.onrender.com/todos
Cookie: token=JWT_TOKEN_HERE
```
##### Update Task
```http
PUT https://todolist-v1-ikyj.onrender.com/todos/:id
Content-Type: application/json
Cookie: token=JWT_TOKEN_HERE

{
  "title": "Updated Task"
}
```
##### Delete Task
```http
DELETE https://todolist-v1-ikyj.onrender.com/todos/:id
Cookie: token=JWT_TOKEN_HERE
```

### 5.2 Why Use Postman for Testing?
- **Token Storage:** After logging in, the JWT token is stored in cookies, which can be automatically used for subsequent requests.
- **Easy API Testing:** Provides a user-friendly interface for making API requests without needing a frontend setup.
- **Debugging & Response Inspection:** Helps inspect API responses, headers, and request payloads for debugging purposes.

---
## 6. Future Improvements
- **Integrate Redis for caching** to reduce database load.
- **Use BullMQ for background job processing** to improve efficiency.
- **Implement WebSockets** for real-time task updates.
- **Introduce Role-Based Access Control (RBAC)** for better permission management.
- **Optimize database queries** to handle a large number of users efficiently.

This documentation provides an overview of the architecture, features, API usage, and future improvements for the To-Do List application.
```

