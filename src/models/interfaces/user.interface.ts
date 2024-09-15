import { Model } from 'sequelize';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  role: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}
