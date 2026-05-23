import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// In-memory user store for mock/offline database mode
const mockUsers: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'nextgen_projector_secret_jwt_key_2026_dev';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password, skills, interests, preferredLevel } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If MongoDB is offline, use mock store
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      const existingMock = mockUsers.find(u => u.email === email.toLowerCase());
      if (existingMock) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const newMockUser = {
        _id: new mongoose.Types.ObjectId().toString(),
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        profile: {
          skills: skills || [],
          interests: interests || [],
          preferredLevel: preferredLevel || 'Beginner',
          avatar: ''
        },
        createdAt: new Date()
      };
      mockUsers.push(newMockUser);

      const token = jwt.sign({ id: newMockUser._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        user: {
          id: newMockUser._id,
          username: newMockUser.username,
          email: newMockUser.email,
          profile: newMockUser.profile
        },
        message: 'Registration successful (Offline DB Sandbox)'
      });
    }

    // Standard Mongo DB Register
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      profile: {
        skills: skills || [],
        interests: interests || [],
        preferredLevel: preferredLevel || 'Beginner',
        avatar: ''
      }
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      },
      message: 'Registration successful'
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      const mockUser = mockUsers.find(u => u.email === email.toLowerCase());
      if (!mockUser) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, mockUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: mockUser._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        token,
        user: {
          id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          profile: mockUser.profile
        },
        message: 'Login successful (Offline DB Sandbox)'
      });
    }

    // Standard Mongo DB Login
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      },
      message: 'Login successful'
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.isGuest) {
      return res.status(200).json({
        user: {
          id: 'guest_user',
          username: 'Guest Explorer',
          email: 'guest@nextgenprojector.ai',
          profile: {
            skills: ['React', 'JavaScript'],
            interests: ['AI', 'Web Apps'],
            preferredLevel: 'Beginner',
            avatar: ''
          },
          isGuest: true
        }
      });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      const mockUser = mockUsers.find(u => u._id === req.user?.id);
      if (!mockUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
        user: {
          id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          profile: mockUser.profile
        }
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
