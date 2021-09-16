import express, { Request, Response } from 'express';

const router = express.Router();

// secure test route
router.get('/profile', (req: Request, res: Response) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.headers.authorization
  });
});

export default router;
