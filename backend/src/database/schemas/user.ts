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
  employees: [
    {
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      salary: {
        type: String,
        required: true
      }
    }
  ],
  salary: {
    type: Number
  }
});
