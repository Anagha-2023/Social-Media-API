import mongoose from 'mongoose';
import { hashedPassword, comparePassword } from '../utils/bcrypt.js'; // Use named import

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hashedPassword(this.password);
  next();
});

// Export the model using ESM syntax
export default mongoose.model('User', userSchema);
