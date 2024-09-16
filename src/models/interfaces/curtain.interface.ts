import { Model, Optional } from 'sequelize';

interface CurtainAttributes {
  id: number;
  name: string;
  price: number;
  rating?: number;
  img: string;
  brandId: number;
  typeId: number;
}

export interface CurtainInstance
  extends Model<CurtainAttributes, Optional<CurtainAttributes, 'id'>>,
    CurtainAttributes {}
