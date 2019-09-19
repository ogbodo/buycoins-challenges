import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import path from 'path';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'build')));

  app.get('/*', (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../', 'build/index.html'));
  });
}

// app.use(validateUserSession.bind(this, firebase));
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

export default app;
