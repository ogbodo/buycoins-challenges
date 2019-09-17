import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const CalculatePriceObjectType: any = new GraphQLObjectType({
  name: 'CalculatePrice',
  fields: {
    type: { type: GraphQLString },
    margin: { type: GraphQLInt },
    exchangeRate: { type: GraphQLInt },
  },
});
const RootQuery: any = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {},
});
const Mutation: any = new GraphQLObjectType({
  name: 'Mutation',
  fields: {},
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
