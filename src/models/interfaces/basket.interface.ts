import { Model } from 'sequelize';

export interface BasketAttributes {
  id?: number;
  userId: number;
}

export interface BasketInstance
  extends Model<BasketAttributes>,
    BasketAttributes {}
