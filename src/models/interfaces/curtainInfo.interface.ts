import { Model, Optional } from 'sequelize';

interface CurtainInfoAttributes {
  id: number;
  title: string;
  description: string;
  curtainId: number;
}

export interface CurtainInfoInstance
  extends Model<CurtainInfoAttributes, Optional<CurtainInfoAttributes, 'id'>>,
    CurtainInfoAttributes {}
