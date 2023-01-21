import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { startOfDay } from 'date-fns';
import { Day } from 'core/utils/time';
import sequelize, { ensureModelExistence } from 'core/sequelize';
import { Story } from 'definitions/models';
import { LocaleEnum } from 'definitions/enums';
import { StoryType } from 'schema/output-types';

const PublicQuery = new GraphQLObjectType({
  name: 'PublicQuery',
  fields: {
    // TODO filtrer par locale et paginer ?
    stories: {
      type: new GraphQLList(StoryType),
      resolve: () => Story.findAll(),
    },

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
      args: {
        locale: { type: new GraphQLNonNull(LocaleEnum) },
      },
      description: 'TODO, currently not working due to postgreSQL nor supporting "random(seed);"',
      resolve: (source, args, ctx) => {
        const { locale } = args;
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
