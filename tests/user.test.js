import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';  // Adjust according to where your app is initialized
import User from '../models/User.js';
import mockingoose from 'mockingoose';
import bcrypt from 'bcrypt';

// Sample data for testing
const userData = {
  username: 'JohnDoe',
  email: 'johndoe@example.com',
  password: 'Password123!',
};

describe('User Authentication', () => {
  // Test for registering a new user
  it('should register a new user', async () => {
    // Mocking the Mongoose User model
    mockingoose(User).toReturn(null, 'save');
    const response = await request(app).post('/api/auth/register').send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered Successfully');
    expect(response.body.userId).toBeDefined();
  });

  // Test for registering with an existing email
  it('should return an error if email is already registered', async () => {
    // Mocking an existing user
    mockingoose(User).toReturn({ email: userData.email }, 'findOne');
    const response = await request(app).post('/api/auth/register').send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already registered, Please register with another E-mail');
  });

  // Test for logging in with correct credentials
  it('should log in a user with valid credentials', async () => {
    // Mocking a user object and password comparison
    mockingoose(User).toReturn({ ...userData, password: bcrypt.hashSync(userData.password, 10) }, 'findOne');
    
    const response = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User Logged in successfully');
    expect(response.body.token).toBeDefined();  // Check if token is returned
  });

  // Test for logging in with incorrect password
  it('should return error for invalid password', async () => {
    // Mocking user data, but sending a wrong password
    mockingoose(User).toReturn({ ...userData, password: bcrypt.hashSync(userData.password, 10) }, 'findOne');
    
    const response = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: 'WrongPassword123!',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or Password');
  });

  // Test for logging in with non-existing email
  it('should return error for non-existing email', async () => {
    // Mocking no user found with the given email
    mockingoose(User).toReturn(null, 'findOne');
    
    const response = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: userData.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or Password');
  });
});

