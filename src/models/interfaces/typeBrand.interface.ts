import { Model, Optional } from 'sequelize';

interface TypeBrandAttributes {
  id: number;
}

export interface TypeBrandInstance
  extends Model<TypeBrandAttributes, Optional<TypeBrandAttributes, 'id'>>,
    TypeBrandAttributes {}
