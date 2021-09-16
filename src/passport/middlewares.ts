import { User } from '../database/models/user';
import { User as UserType } from '../Types/user';
import { NativeError } from 'mongoose';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import config from '../config';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

type User = {
  id?: number;
};

/**
 * determines which data of the user object should be stored in the session
 */
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: UserType) => {
    done(err, user);
  });
});

/**
 * Strategy to register
 */
passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      const exists = await User.exists({ username: username });
      // if exists respond with user already exists
      if (exists) {
        return done(null, false, {
          message: `Username already exists.`
        });
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return err;
          const newUser = new User({
            username: username,
            password: hash
          });
          newUser.save();

          return done(null, newUser, {
            message: 'User created successfully'
          });
        });
      });
    }
  )
);

/**
 * Strategy to sign in using Email and Password.
 */
passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      // checks mongodb if user exists
      User.findOne(
        { username: username },
        (err: NativeError, user: UserType) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, {
              message: `username ${username} not found.`
            });
          }

          bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);

            // password does not match
            if (res === false) {
              return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
          });
        }
      );
    }
  )
);

/**
 * Verifying the JWT from headers from client side
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secretOrKey: config.jwtSecret!
    },
    async (token, done) => {
      console.log('token', token);
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
