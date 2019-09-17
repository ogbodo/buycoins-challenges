import { GraphQLSchema, GraphQLObjectType } from 'graphql';

const rootQuery: any = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {},
});
const rootMutation: any = new GraphQLObjectType({
  name: 'rootMutation',
  fields: {},
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
