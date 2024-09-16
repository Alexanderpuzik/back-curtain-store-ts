import { Model, Optional } from 'sequelize';

interface RatingAttributes {
  id: number;
  rate: number;
  userId: number;
  curtainId: number;
}

export interface RatingInstance
  extends Model<RatingAttributes, Optional<RatingAttributes, 'id'>>,
    RatingAttributes {}
