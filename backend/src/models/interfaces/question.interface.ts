import { Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  text: string;
  eventId: Types.ObjectId;
  createdBy: Types.ObjectId | null;
  isAnonymous: boolean;
  upvotedBy: Types.ObjectId[];
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestionMethods {
  upvoteCount: number; // A virtual getter
}

export interface IQuestionDocument extends IQuestion, IQuestionMethods {}
