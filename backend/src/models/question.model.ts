import { Schema, model } from 'mongoose';
import type { IQuestionDocument } from './interfaces/question.interface.js';

const questionSchema = new Schema<IQuestionDocument>({
  text: {
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
    default: null,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  upvotedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isArchived: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Virtual field for the upvote count
questionSchema.virtual('upvoteCount').get(function(this: IQuestionDocument) {
  return this.upvotedBy.length;
});

export const QuestionModel = model<IQuestionDocument>('Question', questionSchema);
