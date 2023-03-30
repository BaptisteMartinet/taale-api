import type { Context } from 'core/context';

import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Op } from 'sequelize';
import { startOfDay } from 'date-fns';
import { Day } from 'lib/utils';
import sequelize, { ensureModelExistence } from 'core/sequelize';
import { expose } from 'core/graphql';
import { Story } from 'definitions/models';
import { StoryType } from 'schema/output-types';
import StatisticsQuery from './statistics';
import AccountQuery from './account';

const PublicQuery = new GraphQLObjectType<unknown, Context>({
  name: 'PublicQuery',
  fields: {
    statistics: expose(StatisticsQuery),
    account: expose(AccountQuery),

    story: {
      type: StoryType,
      args: {
        storyId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (source, args, ctx) => {
        const { storyId } = args;
        const story = await ensureModelExistence(storyId, Story);
        return story;
      },
    },

    dailyStory: {
      type: StoryType,
      resolve: (source, args, ctx) => {
        const { locale } = ctx;
        const randomSeed = Math.floor(Date.now() / Day);
        return Story.findOne({
          include: [
            {
              association: Story.associations.tree,
              required: true,
              where: {
                open: true,
                locale,
              },
            },
          ],
          where: {
            createdAt: { [Op.lt]: startOfDay(Date.now()) },
          },
          order: sequelize.fn('RAND', randomSeed),
        });
      },
    },
  },
});

export default PublicQuery;
