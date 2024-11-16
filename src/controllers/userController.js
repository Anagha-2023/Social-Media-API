import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import { comparePassword } from '../utils/bcrypt.js'; // Use named import

//Register User
export const registerUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered, Please register with another E-mail' })
    }

    const user = new User({
      username,
      email,
      password
    });
    await user.save();
    return res.status(201).json({ message: 'User registered Successfully', userId: user._id });

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {  // Use comparePassword
      return res.status(401).json({ message: 'Invalid email or Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });  // Ensure JWT_SECRET is set in .env
    return res.status(200).json({ message: 'User Logged in successfully', token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}