import { DataTypes, Sequelize } from 'sequelize';
import dbConnection from '../db';
import { BasketInstance, UserInstance } from './interfaces';

const sequelize = dbConnection();

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

export const BasketCurtain = sequelize.define('basket_curtain', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Curtain = sequelize.define('curtain', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

export const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

export const CurtainInfo = sequelize.define('curtain_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

export const TypeBrand = sequelize.define('type_brand', {
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
