import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from 'schema';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';

interface Context extends StandaloneServerContextFunctionArgument {
  user: boolean; // TODO
}

const server = new ApolloServer<Context>({
  schema,
  cache: 'bounded',
  csrfPrevention: true,
});

async function init() {
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
