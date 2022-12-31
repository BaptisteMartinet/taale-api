import type { User } from 'definitions/models';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Association,
} from 'sequelize';
import sequelize from 'core/sequelize';
import { ReportableType } from 'definitions/enums';

class Report extends Model<InferAttributes<Report>, InferCreationAttributes<Report>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']>;
  declare resourceType: ReportableType;
  declare resourceId: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare static associations: {
    owner: Association<Report, User>;
  };
}

Report.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  resourceType: { type: DataTypes.ENUM, allowNull: false, values: Object.values(ReportableType) },
  resourceId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'reports',
  timestamps: true,
  sequelize,
});

export default Report;
