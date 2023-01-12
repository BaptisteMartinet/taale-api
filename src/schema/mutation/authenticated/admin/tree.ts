import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from 'core/context';
import { Sentence, Tree } from 'definitions/models';
import { LocaleEnum } from 'definitions/enums';
import { genInitialSentenceText } from 'definitions/helpers';
import { TreeType } from 'schema/output-types';

const TreeMutation = new GraphQLObjectType<unknown, Context>({
  name: 'TreeMutation',
  fields: {
    create: {
      type: TreeType,
      args: {
        open: { type: new GraphQLNonNull(GraphQLBoolean) },
        locale: { type: new GraphQLNonNull(LocaleEnum) },
      },
      resolve: async (source, args, ctx) => {
        const { open, locale } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const tree = await Tree.create({
          ownerId: currentUser.id,
          open,
          locale,
        });
        const initialText = genInitialSentenceText(locale);
        await Sentence.create({
          ownerId: currentUser.id,
          treeId: tree.id,
          text: initialText,
        });
        return tree;
      },
    },
    // update
    // delete

    close: {
      type: GraphQLBoolean,
      resolve: async (source, args, ctx) => {
        assert(source instanceof Tree);
        await source.update({ open: false });
        return true;
      },
    },
  },
});

export default TreeMutation;
