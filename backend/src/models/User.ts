import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    preferredLevel: { type: String, default: 'Beginner' },
    avatar: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model('User', UserSchema);
export default User;
