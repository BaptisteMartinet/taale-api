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
  from: { model: User, as: 'trees' },
  to: { model: Tree, key: 'ownerId', as: 'owner' }
});
createOneToManyRelationship({
  from: { model: User, as: 'sentences' },
  to: { model: Sentence, key: 'ownerId', as: 'owner' },
});
createOneToManyRelationship({
  from: { model: User, as: 'reports' },
  to: { model: Report, key: 'ownerId', as: 'owner' },
});
createOneToManyRelationship({
  from: { model: User, as: 'completions' },
  to: { model: Completion, key: 'ownerId', as: 'owner' },
});

createOneToManyRelationship({
  from: { model: Tree, as: 'sentences' },
  to: { model: Sentence, key: 'treeId', as: 'tree' },
});
createOneToManyRelationship({
  from: { model: Tree, as: 'stories' },
  to: { model: Story, key: 'treeId', as: 'tree' },
});

createOneToManyRelationship({
  from: { model: Sentence, as: 'completions' },
  to: { model: Completion, key: 'sentenceId', as: 'sentence' },
});
createOneToOneRelationship({
  from: { model: Sentence, as: 'story' },
  to: { model: Story, key: 'sentenceId', as: 'sentence' },
});
createOneToManyRelationship({
  from: { model: Sentence, as: 'storiesLinks' },
  to: { model: StorySentenceLink, key: 'sentenceId', as: 'sentence' },
});

createOneToManyRelationship({
  from: { model: Story, as: 'sentencesLinks' },
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
