import type { Context } from 'core/context';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import env from './core/env';
import sequelize from 'core/sequelize';
import context from 'core/context';
import schema from './schema';

const server = new ApolloServer<Context>({
  schema,
  cache: 'bounded',
  csrfPrevention: true,
});

async function init() {
  try {
    await sequelize.authenticate();
    console.info('Database successfully connected ✔️');
    /*await sequelize.sync({ alter: true, force: true }); // TODO sync script
    console.info("Database synchronisation. ✔️");*/
  } catch (e) {
    console.error('Unable to connect to database:', e);
    return;
  }
  const instance = await startStandaloneServer(server, {
    listen: { port: env.PORT },
    context,
  });
  console.info(`🚀 Server ready at: ${instance.url}`);
}

init().catch((e) => { console.error(e) });
