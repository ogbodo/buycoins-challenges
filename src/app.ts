import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.disable('x-powered-by');
app.use(express.json());

// app.use(validateUserSession.bind(this, firebase));
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(process.env.PORT || 4000, () => {
  console.log('server is running');
});

export default app;
