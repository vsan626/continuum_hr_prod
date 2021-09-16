import * as dotenv from 'dotenv';
dotenv.config();

export default {
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET
};
