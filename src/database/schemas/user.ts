import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  employeeName: {
    type: String
  },
  salary: {
    type: Number
  }
});
