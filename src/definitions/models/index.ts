import User from './User';
import Tree from './Tree';
import Sentence from './Sentence';
import Report from './Report';
import Completion from './Completion';
import Story from './Story';

Tree.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
Tree.hasMany(Sentence, {
  sourceKey: 'id',
  foreignKey: 'treeId',
  as: 'sentences',
});
Tree.hasMany(Story, {
  sourceKey: 'id',
  foreignKey: 'treeId',
  as: 'stories',
});

User.hasMany(Tree, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'stories',
});
User.hasMany(Sentence, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'sentences',
});
User.hasMany(Report, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'reports',
});
User.hasMany(Completion, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'completions',
});

Sentence.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
Sentence.belongsTo(Tree, {
  foreignKey: 'treeId',
  targetKey: 'id',
  as: 'tree',
});
Sentence.belongsTo(Sentence, {
  foreignKey: 'parentSentenceId',
  targetKey: 'id',
  as: 'parentSentence',
});
Sentence.hasMany(Sentence, {
  sourceKey: 'id',
  foreignKey: 'parentSentenceId',
  as: 'sentences',
});
Sentence.hasMany(Completion, {
  sourceKey: 'id',
  foreignKey: 'sentenceId',
  as: 'completions'
});
Sentence.hasOne(Story, {
  sourceKey: 'id',
  foreignKey: 'sentenceId',
  as: 'story',
});

Report.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});

Completion.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
Completion.belongsTo(Sentence, {
  foreignKey: 'sentenceId',
  targetKey: 'id',
  as: 'sentence',
});

Story.belongsTo(Sentence, {
  foreignKey: 'sentenceId',
  targetKey: 'id',
  as: 'sentence',
});
Story.belongsTo(Tree, {
  foreignKey: 'treeId',
  targetKey: 'id',
  as: 'tree',
});

export {
  User,
  Tree,
  Sentence,
  Report,
  Completion,
  Story,
};
