import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const CalculatePriceObjectType: any = new GraphQLObjectType({
  name: 'CalculatePriceObjectType',
  fields: {
    exchangeType: { type: GraphQLString },
    margin: { type: GraphQLInt },
    exchangeRate: { type: GraphQLInt },
  },
});
const calculatePrice: any = new GraphQLObjectType({
  name: 'calculatePrice',
  fields: {
    compute: { type: CalculatePriceObjectType },
    exchangeType: { type: GraphQLString },
    margin: { type: GraphQLInt },
    exchangeRate: { type: GraphQLInt },
  },
});

export default new GraphQLSchema({
  query: calculatePrice,
});
