import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password and role are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword, role });

  return res.status(201).json({ message: 'Registration successful. Please login.' });
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(404).json({ message: 'User not found for selected role' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};
