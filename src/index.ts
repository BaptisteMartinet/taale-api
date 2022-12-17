import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import sequelize from 'db';
import schema from './schema';

interface Context extends StandaloneServerContextFunctionArgument {
  user: boolean; // TODO
}

const server = new ApolloServer<Context>({
  schema,
  cache: 'bounded',
  csrfPrevention: true,
});

async function init() {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to postgreSQL ✔️');
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully. ✔️");
  } catch (e) {
    console.error('Unable to connect to database:', e);
    return;
  }
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {
        req,
        res,
        user: true,
      };
    },
  });
  console.log(`🚀 Server ready at: ${url}`);
}

init().catch((e) => { console.error(e) });
