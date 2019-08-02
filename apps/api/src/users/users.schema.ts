import * as mongoose from 'mongoose';

export interface User {
  document: number;
  name: string;
  lastName: string;
  birthDate: string;
}

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
