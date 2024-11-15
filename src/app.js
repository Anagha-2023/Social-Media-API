// src/server.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { connectDb } from './server.js';


// Create an Express app
const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDb()

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Social Media API')
})

export default app;
