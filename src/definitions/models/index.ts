import User from './User';
import Story from './Story';
import Sentence from './Sentence';
import Report from './Report';
import Completion from './Completion';

Story.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
Story.hasMany(Sentence, {
  sourceKey: 'id',
  foreignKey: 'storyId',
  as: 'sentences',
});

User.hasMany(Story, {
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
Sentence.belongsTo(Story, {
  foreignKey: 'storyId',
  targetKey: 'id',
  as: 'story',
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

export {
  User,
  Story,
  Sentence,
  Report,
  Completion,
};
