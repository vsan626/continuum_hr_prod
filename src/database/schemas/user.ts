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
  employees: [{
    first_name: String,
    last_name: String,
    salary: String,
  }],
  salary: {
    type: Number
  }
});
