import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: String,
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
