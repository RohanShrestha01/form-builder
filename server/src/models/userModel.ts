import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  passwordChangedAt?: Date;
}

const userSchema = new Schema<IUser>(
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
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

export default model<IUser>('User', userSchema);
