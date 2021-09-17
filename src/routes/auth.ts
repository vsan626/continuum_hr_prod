import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

/**
 * creates a new user
 */
router.post('/register', async (req, res) => {
  passport.authenticate('register', async (err, message) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.json(message);
  })(req, res);
});

/**
 * login route
 */
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err) {
        return res.status(400).json({ error: err });
      }

      if (!user) {
        return res.status(400).json({ error: 'No user found' });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        const body = { _id: user._id, username: user.username };

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = jwt.sign({ user: body }, config.jwtSecret!);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
