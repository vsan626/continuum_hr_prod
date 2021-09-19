import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../database/models/user';
import { User as UserType } from '../Types/user';

const router = express.Router();

// secure test route
router.get('/employees', async (req: Request, res: Response) => {
  let authorization;
  let decoded;
  if (req.headers && req.headers.authorization) {
    authorization = req.headers.authorization.split(' ')[1];
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      decoded = jwt.verify(authorization, config.jwtSecret!);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
  }

  const employees = await User.findOne({ _id: decoded.user._id }).select(
    'employees'
  );

  if (!employees) {
    return res.json({
      message: 'User could not be found'
    });
  }

  return res.json(employees);
});

router.post('/newemployee', async (req: Request, res: Response) => {
  const { firstname, lastname, salary } = req.body;
  // TODO: refactor into reusable method for fetching token / user data
  let authorization;
  let decoded;
  if (req.headers && req.headers.authorization) {
    authorization = req.headers.authorization.split(' ')[1];

    try {
      decoded = jwt.verify(authorization, config.jwtSecret);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
  }

  type responseData = {
    _id?: string;
    employees?: [];
  };

  const exists: responseData = await User.findById(
    { _id: decoded.user._id },
    {
      employees: {
        $elemMatch: { first_name: firstname, last_name: lastname }
      }
    }
  );

  if (exists.employees.length > 0) {
    return res.status(400).json({
      message: 'This employee already exists'
    });
  }

  User.findByIdAndUpdate(
    { _id: decoded.user._id },
    {
      $addToSet: {
        employees: {
          first_name: firstname,
          last_name: lastname,
          salary: salary
        }
      }
    },
    (err) => {
      if (err) {
        return res.json({
          message: 'Employee could not be added',
          err
        });
      } else {
        return res.json({
          message: `New employee has been added`
        });
      }
    }
  );
});

export default router;
