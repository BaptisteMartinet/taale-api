import User from './User';
import Story from './Story';
import Sentence from './Sentence';

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

export {
  User,
  Story,
  Sentence,
};
