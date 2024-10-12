import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface UserInstance
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>,
    UserAttributes {}
