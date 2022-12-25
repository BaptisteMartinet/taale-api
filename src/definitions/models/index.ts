import User from './User';
import Story from './Story';

Story.belongsTo(User, {
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
User.hasMany(Story, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'stories',
});

export {
  User,
  Story,
};
