import { Document, Model, model, Schema } from 'mongoose';
import { IUsers } from './iuser';

export interface IUsersModel extends IUsers, Document {}
const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    age: { type: Number },
    birthDate: { type: Date },
    city: { type: String },
  }
)

export const Users: Model<IUsersModel> = model<IUsersModel>('Users', userSchema);