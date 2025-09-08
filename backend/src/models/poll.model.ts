import { Schema, model } from 'mongoose';
import type { IPoll } from './interfaces/poll.interface.js';

// The sub-schema for a poll option
const pollOptionSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  votedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const pollSchema = new Schema<IPoll>({
  question: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  options: [pollOptionSchema],
  isClosed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const PollModel = model<IPoll>('Poll', pollSchema);
