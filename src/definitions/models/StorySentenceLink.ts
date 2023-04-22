import type { Sentence, Story } from 'definitions/models';

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

class StorySentenceLink extends Model<InferAttributes<StorySentenceLink>, InferCreationAttributes<StorySentenceLink>> {
  declare id: CreationOptional<number>;
  declare storyId: ForeignKey<number>;
  declare sentenceId: ForeignKey<number>;
  declare position: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare story?: NonAttribute<Story>;
  declare sentence?: NonAttribute<Sentence>;
  declare static associations: {
    story: Association<StorySentenceLink, Story>;
    sentence: Association<StorySentenceLink, Sentence>;
  };
}

StorySentenceLink.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  storyId: { type: DataTypes.INTEGER, allowNull: false },
  sentenceId: { type: DataTypes.INTEGER, allowNull: false },
  position: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'story_sentence_links',
  timestamps: true,
  indexes: [{ fields: ['sentenceId', 'storyId'], unique: true }],
  sequelize,
});

export default StorySentenceLink;
