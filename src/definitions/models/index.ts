import User from './User';
import Story from './Story';
import Sentence from './Sentence';
import Report from './Report';

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

Report.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});

export {
  User,
  Story,
  Sentence,
  Report,
};
