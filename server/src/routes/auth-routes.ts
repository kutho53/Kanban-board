import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body;
  //find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({message: 'Invalid credentials'});
  }

  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({message:'invalid credentials'});
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.sendStatus(500);

  //generate jwt token
  const token = jwt.sign({id: user.id}, secret, {expiresIn: '1h'});

  //return the token
  res.json({token});
}
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
