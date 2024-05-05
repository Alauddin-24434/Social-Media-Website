# Social Media Backend Server

This repository contains the backend server code for the Social Media Website project.

## Getting Started

Follow these steps to set up and run the backend server:

### 1. Clone the Repository

```bash
git clone https://github.com/Alauddin-24434/Social-Media-Website.git

### 2.  Navigate to the Backend Directory


cd Social-Media-Website/social-media-backend

### 3. Install Dependencies

npm install

### 4. Create Environment Variables
Create a .env file in the social-media-backend directory and add the following variables:
DB_NAME=db_name
DB_PASS=db_pass

### 5. Start the Server
To start the server, you can use either npm start or nodemon index.js command:
npm start
# OR
nodemon index.js

The server will start running on http://localhost:5000 by default.

API Documentation
The backend server provides the following endpoints:

GET /searchUser: Search for a user by ID.
GET /combinedData: Get combined user data and posts.
GET /loginUser: Login user by email.
GET /userId: Get user data by ID.
GET /allUsers: Get all users.
POST /createUser: Create a new user.
POST /createUserPost: Create a new user post.
