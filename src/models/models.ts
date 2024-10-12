import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import {
  BasketCurtainInstance,
  BasketInstance,
  BrandInstance,
  CurtainInfoInstance,
  CurtainInstance,
  RatingInstance,
  TypeBrandInstance,
  TypeInstance,
  UserInstance,
} from './interfaces';

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Basket = sequelize.define<BasketInstance>('basket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const BasketCurtain = sequelize.define<BasketCurtainInstance>(
  'basket_curtain',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    curtainId: { type: DataTypes.INTEGER, allowNull: false },
  }
);

export const Curtain = sequelize.define<CurtainInstance>('curtain', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const Type = sequelize.define<TypeInstance>('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Brand = sequelize.define<BrandInstance>('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Rating = sequelize.define<RatingInstance>('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  curtainId: { type: DataTypes.INTEGER, allowNull: false },
});

export const CurtainInfo = sequelize.define<CurtainInfoInstance>(
  'curtain_info',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    curtainId: { type: DataTypes.INTEGER, allowNull: false },
  }
);

export const TypeBrand = sequelize.define<TypeBrandInstance>('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketCurtain);
BasketCurtain.belongsTo(Basket);

Type.hasMany(Curtain);
Curtain.belongsTo(Type);

Brand.hasMany(Curtain);
Curtain.belongsTo(Brand);

Curtain.hasMany(Rating);
Rating.belongsTo(Curtain);

Curtain.hasMany(BasketCurtain);
BasketCurtain.belongsTo(Curtain);

Curtain.hasMany(CurtainInfo, { as: 'info' });
CurtainInfo.belongsTo(Curtain);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });
