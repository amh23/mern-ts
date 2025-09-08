import { Schema, model } from 'mongoose';
import type { IEvent } from './interfaces/event.interface.js';

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  description: {
    type: String,
    trim: true,
  },
  eventCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 6,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coOrganizers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  polls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  allowAnonymousQuestions: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const EventModel = model<IEvent>('Event', eventSchema);
