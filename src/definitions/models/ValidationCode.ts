import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from 'core/sequelize';

class ValidationCode extends Model<InferAttributes<ValidationCode>, InferCreationAttributes<ValidationCode>> {
  declare id: CreationOptional<number>;
  declare action: string;
  declare email: string;
  declare code: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ValidationCode.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  action: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  code: { type: DataTypes.STRING, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'validation_codes',
  timestamps: true,
  indexes: [{ fields: ['action', 'email'], unique: true, }],
  sequelize,
});

export default ValidationCode;
