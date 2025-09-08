import { Document, Types } from 'mongoose';

// Defines the data properties of a User. It extends Mongoose's Document
// for access to standard Mongoose properties like `_id`.
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password?: string; // Optional because it's excluded from query results
  loginAttempts: number;
  role: 'superadmin' | 'user'; // System-wide roles
  lockUntil?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Defines the custom methods attached to the User model.
export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  incLoginAttempts: () => Promise<void>;
  resetLoginAttempts: () => Promise<void>;
}

// Combines the document properties and custom methods for the full Mongoose document type.
// This is what will be passed to the `Schema` and `model` in the `*.model.ts` file.
export interface IUserDocument extends IUser, IUserMethods {}