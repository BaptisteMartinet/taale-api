import type { Completion, Story, User } from 'definitions/models';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
  ForeignKey,
} from 'sequelize';
import sequelize from 'core/sequelize';

class Sentence extends Model<InferAttributes<Sentence>, InferCreationAttributes<Sentence>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']>;
  declare storyId: ForeignKey<Story['id']>;
  declare parentSentenceId: ForeignKey<Sentence['id']>;
  declare text: string;
  declare theEnd: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare story?: NonAttribute<Story>;
  declare parentSentence?: NonAttribute<Sentence>;
  declare sentences?: NonAttribute<Sentence[]>;
  declare completions?: NonAttribute<Completion[]>;
  declare static associations: {
    owner: Association<Sentence, User>;
    story: Association<Sentence, Story>;
    parentSentence: Association<Sentence, Sentence>;
    sentences: Association<Sentence, Sentence>;
    completions: Association<Sentence, Completion>;
  };
}

Sentence.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  storyId: { type: DataTypes.INTEGER, allowNull: false },
  parentSentenceId: { type: DataTypes.INTEGER, allowNull: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  theEnd: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'sentences',
  timestamps: true,
  sequelize,
});

export default Sentence;
