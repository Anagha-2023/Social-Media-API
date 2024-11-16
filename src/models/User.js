import mongoose from 'mongoose';
import { hashedPassword } from '../utils/bcrypt.js';  // Use named import for hashedPassword

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashedPassword(this.password);  // Use hashedPassword
  }
  next();
});

// Export the model using ESM syntax
export default mongoose.model('User', userSchema);
