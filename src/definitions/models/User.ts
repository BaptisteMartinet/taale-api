import type { Tree, Sentence, Report, Completion } from 'definitions/models';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
} from 'sequelize';
import { PasswordMinLenght } from 'core/constants';
import sequelize from 'core/sequelize';
import { Role } from 'definitions/enums';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<Role>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare trees?: NonAttribute<Tree[]>;
  declare sentences?: NonAttribute<Sentence[]>;
  declare reports?: NonAttribute<Report[]>;
  declare completions?: NonAttribute<Completion[]>;
  declare static associations: {
    trees: Association<User, Tree>;
    sentences: Association<User, Sentence>;
    reports: Association<User, Report>;
    completions: Association<User, Completion>;
  };
}

User.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false, validate: { min: PasswordMinLenght } },
  role: { type: DataTypes.ENUM, allowNull: false, values: Object.values(Role), defaultValue: Role.Default },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'users',
  timestamps: true,
  sequelize,
});

export default User;
