import type { Completion, Story, StorySentenceLink, Tree, User } from 'definitions/models';

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
  declare ownerId: ForeignKey<number>;
  declare treeId: ForeignKey<number>;
  declare parentSentenceId: CreationOptional<ForeignKey<number>>;
  declare text: string;
  declare theEnd: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare owner?: NonAttribute<User>;
  declare tree?: NonAttribute<Tree>;
  declare parentSentence?: NonAttribute<Sentence>;
  declare sentences?: NonAttribute<Sentence[]>;
  declare completions?: NonAttribute<Completion[]>;
  declare story?: NonAttribute<Story>;
  declare storiesLinks?: NonAttribute<StorySentenceLink[]>;
  declare static associations: {
    owner: Association<Sentence, User>;
    tree: Association<Sentence, Tree>;
    parentSentence: Association<Sentence, Sentence>;
    sentences: Association<Sentence, Sentence>;
    completions: Association<Sentence, Completion>;
    story: Association<Sentence, Story>;
    storiesLinks: Association<Sentence, StorySentenceLink>;
  };
}

Sentence.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: true },
  treeId: { type: DataTypes.INTEGER, allowNull: false },
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
