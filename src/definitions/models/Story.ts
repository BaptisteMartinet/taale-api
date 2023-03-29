import type { Sentence, StorySentenceLink, Tree } from 'definitions/models';

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

class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
  declare id: CreationOptional<number>;
  declare sentenceId: ForeignKey<number>;
  declare treeId: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare sentence?: NonAttribute<Sentence>;
  declare tree?: NonAttribute<Tree>;
  declare sentencesLinks?: NonAttribute<StorySentenceLink[]>
  declare static associations: {
    sentence: Association<Story, Sentence>;
    tree: Association<Story, Tree>;
    sentencesLinks: Association<Story, StorySentenceLink>;
  };
}

Story.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  sentenceId: { type: DataTypes.INTEGER, allowNull: false },
  treeId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'stories',
  timestamps: true,
  indexes: [{ fields: ['sentenceId'], unique: true }],
  sequelize,
});

export default Story;
