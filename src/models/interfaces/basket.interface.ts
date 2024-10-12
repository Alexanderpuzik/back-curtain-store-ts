import { Model, Optional } from 'sequelize';

interface BasketAttributes {
  id: number;
  userId: number;
}

export interface BasketInstance
  extends Model<BasketAttributes, Optional<BasketAttributes, 'id'>>,
    BasketAttributes {}
