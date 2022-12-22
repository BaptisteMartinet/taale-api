import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Association,
} from 'sequelize';
import sequelize from 'core/sequelize';
import User from './User';

class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']>;
  declare open: boolean;

  declare static associations: {
    owner: Association<Story, User>;
  };
}

Story.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  open: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  tableName: 'stories',
  timestamps: true,
  sequelize,
});

Story.belongsTo(User);

export default Story;
