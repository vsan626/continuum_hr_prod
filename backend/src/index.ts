import express from 'express';
import session from 'express-session';
import db from './database/db';
import passport from './passport/middlewares';
import auth from './routes/auth';
import user from './routes/user';
import cors from 'cors';
import config from './config';
import path from 'path';

const app = express();
const port = 8080;

// Database connection
db();

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(
  session({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    secret: config.sessionSecret!,
    resave: false,
    saveUninitialized: true
  })
);
app.use(
  express.static(path.join(__dirname, '../../frontend/continuum_view/build'))
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', auth);
app.use('/api/user', passport.authenticate('jwt', { session: false }), user);

// initialize server
app.listen(port, async () =>
  console.log(`Listening at http://localhost:${port}`)
);
