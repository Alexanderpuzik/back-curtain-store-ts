import jwt from 'jsonwebtoken';

export interface UserPayload extends jwt.JwtPayload {
  role: string;
}
