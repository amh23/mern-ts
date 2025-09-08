import { Document, Types } from 'mongoose';

export interface IEvent extends Document {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    eventCode: string;
    createdBy: Types.ObjectId; // A single owner (User)
    coOrganizers: Types.ObjectId[]; // Array of co-organizers (Users)
    questions: Types.ObjectId[];
    polls: Types.ObjectId[];
    isActive: boolean;
    isPrivate: boolean; // Control event visibility
    allowAnonymousQuestions: boolean; // Control anonymity
    createdAt?: Date;
    updatedAt?: Date;
}
