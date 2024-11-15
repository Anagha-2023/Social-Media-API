## Social Media API ##
A simple backend API for a social media application, built with Express.js, MongoDB, and Mongoose.


# Features

1. User registration and login with JWT authentication
2. Create, read, update, and delete posts
3. Like/dislike post functionality
4. Unit tests for user management endpoints
5. User Profile image 
6. commends on post

# Clone the Repository
https://github.com/Anagha-2023/Social-Media-API

# Navigate to Project directory
cd social-media-API

# Install Dependencies
npm install

# Set up ENV
MONGO_URI=mongodb://127.0.0.1:27017/social-media-API
PORT=3000
JWT_SECRET=Anagha@123

# Start server
npm start (Production)
npm run Dev (Development)

# Testing
npm test

# API ENDPOINTS

### User Management
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user

### Post Management
- `POST /api/posts`: Create a new post
- `GET /api/posts`: Get all posts (with pagination)
- `PUT /api/posts/:id`: Update a post
- `DELETE /api/posts/:id`: Delete a post
- `POST /api/posts/:id/like`: Like/dislike a post