import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.sendStatus(500); // internal server error if secret is not defined

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // invalid token
    if (typeof user !== 'string' && user) {
      req.user = user as JwtPayload; // save user info
      return next();
    } else {
      return res.sendStatus(403); // invalid token
    }
  });

  return;
};

