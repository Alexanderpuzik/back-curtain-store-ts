import { Model, Optional } from 'sequelize';

interface TypeAttributes {
  id: number;
  name: string;
}

export interface TypeInstance
  extends Model<TypeAttributes, Optional<TypeAttributes, 'id'>>,
    TypeAttributes {}
