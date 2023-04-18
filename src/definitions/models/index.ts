import { createOneToManyRelationship, createOneToOneRelationship } from 'core/sequelize';
import User from './User';
import Tree from './Tree';
import Sentence from './Sentence';
import Report from './Report';
import Completion from './Completion';
import Story from './Story';
import StorySentenceLink from './StorySentenceLink';
import EmailValidationCode from './EmailValidationCode';

createOneToManyRelationship({
  from: { model: User, as: 'trees', onDelete: 'NO ACTION' },
  to: { model: Tree, key: 'ownerId', as: 'owner' }
});
createOneToManyRelationship({
  from: { model: User, as: 'sentences', onDelete: 'NO ACTION' },
  to: { model: Sentence, key: 'ownerId', as: 'owner' },
});
createOneToManyRelationship({
  from: { model: User, as: 'reports', onDelete: 'CASCADE' },
  to: { model: Report, key: 'ownerId', as: 'owner' },
});
createOneToManyRelationship({
  from: { model: User, as: 'completions', onDelete: 'CASCADE' },
  to: { model: Completion, key: 'ownerId', as: 'owner' },
});

createOneToManyRelationship({
  from: { model: Tree, as: 'sentences', onDelete: 'CASCADE' },
  to: { model: Sentence, key: 'treeId', as: 'tree' },
});
createOneToManyRelationship({
  from: { model: Tree, as: 'stories', onDelete: 'CASCADE' },
  to: { model: Story, key: 'treeId', as: 'tree' },
});

createOneToManyRelationship({
  from: { model: Sentence, as: 'completions', onDelete: 'CASCADE' },
  to: { model: Completion, key: 'sentenceId', as: 'sentence' },
});
createOneToOneRelationship({
  from: { model: Sentence, as: 'story', onDelete: 'NO ACTION' },
  to: { model: Story, key: 'sentenceId', as: 'sentence' },
});
createOneToManyRelationship({
  from: { model: Sentence, as: 'storiesLinks', onDelete: 'CASCADE' },
  to: { model: StorySentenceLink, key: 'sentenceId', as: 'sentence' },
});

createOneToManyRelationship({
  from: { model: Story, as: 'sentencesLinks', onDelete: 'CASCADE' },
  to: { model: StorySentenceLink, key: 'storyId', as: 'story' },
});

export {
  User,
  Tree,
  Sentence,
  Report,
  Completion,
  Story,
  StorySentenceLink,
  EmailValidationCode,
};
