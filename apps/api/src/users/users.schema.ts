import * as mongoose from 'mongoose';

import { User } from '@angular-nest/data';

export interface UserDocument extends User, mongoose.Document {}

export const UserSchema = new mongoose.Schema({
  document: { type: Number, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
});

export const UserCollectionName = 'users';
const User = mongoose.model<UserDocument>(UserCollectionName, UserSchema);
export default User;
