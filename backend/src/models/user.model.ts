import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUserDocument } from  './interfaces/user.interface.js';

// The schema is defined separately from the interface. It specifies how the data
// is stored and validated in the MongoDB collection.
const userSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Prevents password from being returned by default
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
    select: false,
  },
  role: {
    type: String,
    enum: ['superadmin', 'user'],
    default: 'user',
  },
  lockUntil: {
    type: Number,
    select: false,
  },
}, { timestamps: true });

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

// Instance method to increment login attempts with lockout logic
userSchema.methods.incLoginAttempts = async function(): Promise<void> {
  const lockoutTime = 1000 * 60 * 30; // 30 minutes
  const maxAttempts = 5;

  if (this.lockUntil && this.lockUntil > Date.now()) {
    throw new Error('Account locked. Please try again later.');
  }
  
  this.loginAttempts += 1;
  if (this.loginAttempts >= maxAttempts) {
    this.lockUntil = Date.now() + lockoutTime;
  }
  
  await this.save();
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = async function(): Promise<void> {
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  await this.save();
};

// The Mongoose model is created from the schema and typed with the interface.
export const UserModel = model<IUserDocument>('User', userSchema);
