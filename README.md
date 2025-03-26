# User Authentication System with JWT and MongoDB

This is a simple user authentication system built with Node.js, Express, MongoDB, and JWT (JSON Web Tokens). The system includes user registration, login, and access control to protected routes using JWT authentication.

## Features

- **User Registration**: Users can register with a username, email, and password. Passwords are hashed using `bcryptjs` for security.
- **User Login**: Registered users can log in by providing their email and password. A JWT token is issued upon successful login.
- **Protected Routes**: A middleware ensures that users are authenticated via their JWT token to access protected routes.

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB instance (can use MongoDB Atlas or a local MongoDB server)
- A `.env` file for storing sensitive information such as the MongoDB URI and JWT secret key.

