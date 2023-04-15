import type { Context } from 'core/context';

import assert from 'assert';
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Sentence } from 'definitions/models';

export default new GraphQLObjectType<unknown, Context>({
  name: 'AuthenticatedStatisticsQuery',
  fields: {
    mySentences: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(source, args, ctx) {
        assert(ctx.currentUser);
        return Sentence.count({
          where: { ownerId: ctx.currentUser.id },
        });
      },
    },
  },
});
