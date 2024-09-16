import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Basket } from '../models/models';
import { JwtPayload } from '../interfaces';

const generateJwt = (id: number, email: string, role: string): string => {
  return jwt.sign(
    { id, email, role } as JwtPayload,
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
    }
  );
};

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password,
      role,
    }: { email: string; password: string; role: string } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('A user with this email already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    if (!user) return next(ApiError.internal('User not created'));
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('User not found'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Wrong password'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req: Request, res: Response, next: NextFunction) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

export default new UserController();
