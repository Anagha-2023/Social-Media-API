import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`Server started on http://localhost:${PORT}`);
});
