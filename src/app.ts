import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

export default app;
