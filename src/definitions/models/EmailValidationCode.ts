import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from 'core/sequelize';

class EmailValidationCode extends Model<InferAttributes<EmailValidationCode>, InferCreationAttributes<EmailValidationCode>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare code: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EmailValidationCode.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'email_validation_codes',
  timestamps: true,
  indexes: [{ fields: ['email'], unique: true, }],
  sequelize,
});

export default EmailValidationCode;
