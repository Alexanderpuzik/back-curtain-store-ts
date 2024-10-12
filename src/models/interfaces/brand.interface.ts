import { Model, Optional } from 'sequelize';

interface BrandAttributes {
  id: number;
  name: string;
}

export interface BrandInstance
  extends Model<BrandAttributes, Optional<BrandAttributes, 'id'>>,
    BrandAttributes {}
