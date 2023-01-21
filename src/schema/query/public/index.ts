import type { Context } from 'core/context';

import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { startOfDay } from 'date-fns';
import { Day } from 'core/utils/time';
import sequelize, { ensureModelExistence } from 'core/sequelize';
import { Story } from 'definitions/models';
import { StoryType } from 'schema/output-types';

const PublicQuery = new GraphQLObjectType<unknown, Context>({
  name: 'PublicQuery',
  fields: {
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

    storyOfTheDay: {
      type: StoryType,
      description: 'TODO, currently not working due to postgreSQL nor supporting "random(seed);"',
      resolve: (source, args, ctx) => {
        const { locale } = ctx;
        const randomSeed = Math.floor(Date.now() / Day);
        return Story.findOne({
          include: {
            association: Story.associations.tree,
            required: true,
            where: {
              open: true,
              locale,
            },
          },
          where: {
            createdAt: { $lt: startOfDay(Date.now()) },
          },
          order: sequelize.fn('random', randomSeed),
        });
      },
    },
  },
});

export default PublicQuery;
