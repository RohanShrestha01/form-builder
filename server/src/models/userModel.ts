import { type Query, Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  avatar: string | null;
  password: string;
  passwordChangedAt?: Date;
  refreshToken: string[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
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
    avatar: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    passwordChangedAt: Date,
    refreshToken: [String],
    passwordResetToken: String,
    passwordResetExpires: Date,
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre(/^find/, function (this: Query<IUser | IUser[], IUser>, next) {
  this.where({ isDeleted: false });
  next();
});

export default model<IUser>('User', userSchema);
