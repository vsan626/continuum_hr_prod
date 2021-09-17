import { model } from 'mongoose';
import { UserSchema } from '../schemas/user';

export const User = model('User', UserSchema);
