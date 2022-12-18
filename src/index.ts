import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import * as jwt from 'jsonwebtoken';
import env from './utils/env';
import sequelize from 'db';
import { User } from 'models';
import schema from './schema';

interface Context extends StandaloneServerContextFunctionArgument {
  currentUser?: User;
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
    console.log("All models were synchronized successfully. ✔️"); // TODO sync script
  } catch (e) {
    console.error('Unable to connect to database:', e);
    return;
  }
  const { url } = await startStandaloneServer(server, {
    listen: { port: env.PORT },
    context: async ({ req, res }) => {
      const ctx: Context = { req, res };
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return ctx;
      const [, token] = authHeader.split(' ');
      try {
        const payload = jwt.verify(token, env.JWT_SECRET_KEY) as jwt.JwtPayload;
        const currentUser = await User.findByPk(payload.userId);
        if (!currentUser)
          throw new Error('User does not exist');
        Object.assign(ctx, { currentUser });
      } catch (error) {
        console.error(error);
      }
      return ctx;
    },
  });
  console.log(`🚀 Server ready at: ${url}`);
}

init().catch((e) => { console.error(e) });
