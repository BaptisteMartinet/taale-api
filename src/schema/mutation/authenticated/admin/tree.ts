import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context } from 'core/context';
import { Sentence, Tree } from 'definitions/models';
import { LocaleEnum } from 'definitions/enums';
import { genInitialSentenceText } from 'definitions/helpers';
import { TreeType } from 'schema/output-types';

const TreeMutation = new GraphQLObjectType<unknown, Context>({
  name: 'TreeMutation',
  fields: {
    create: {
      type: new GraphQLNonNull(TreeType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        open: { type: new GraphQLNonNull(GraphQLBoolean) },
        locale: { type: new GraphQLNonNull(LocaleEnum) },
      },
      resolve: async (source, args, ctx) => {
        const { name, open, locale } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const tree = await Tree.create({
          ownerId: currentUser.id,
          name,
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
