import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
});

export default mongoose.model('User', userSchema);
