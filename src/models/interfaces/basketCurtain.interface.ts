import { Model, Optional } from 'sequelize';

interface BasketCurtainAttributes {
  id: number;
  basketId: number;
  curtainId: number;
}

export interface BasketCurtainInstance
  extends Model<
      BasketCurtainAttributes,
      Optional<BasketCurtainAttributes, 'id'>
    >,
    BasketCurtainAttributes {}
