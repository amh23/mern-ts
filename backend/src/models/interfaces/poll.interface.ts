import { Document, Types } from 'mongoose';

// Define the interface for a poll option.
export interface IPollOption {
  text: string;
  votedBy: Types.ObjectId[];
}

export interface IPoll extends Document {
  _id: Types.ObjectId;
  question: string;
  eventId: Types.ObjectId;
  createdBy: Types.ObjectId;
  options: Types.DocumentArray<IPollOption>;
  isClosed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
