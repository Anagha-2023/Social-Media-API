import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Welcome to Social Media API')
})

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
