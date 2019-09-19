import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import { doValidation } from './utils';
import fetchPrice from './helper/fetch-price';

const CalculatePriceObjectType: any = new GraphQLObjectType({
  name: 'CalculatePriceObjectType',
  fields: {
    exchangeType: { type: GraphQLString },
    margin: { type: GraphQLInt },
    exchangeRate: { type: GraphQLFloat },
    calculatedPrice: {
      type: GraphQLString,
      resolve(parent: any, _args: any) {
        return parent;
      },
    },
  },
});

const RootQuery: any = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    calculatePrice: {
      description: `THIS FIELD DOES THE ACTUAL CALCULATION BASED ON ARGS`,
      type: CalculatePriceObjectType,
      args: {
        exchangeType: { type: GraphQLString },
        margin: { type: GraphQLFloat },
        exchangeRate: { type: GraphQLInt },
      },
      async resolve(_parent: any, args: any) {
        const { error, value } = doValidation({ ...args });
        if (error) {
          return error;
        }

        const currentPrice = await fetchPrice();

        const computedMargin =
          value.exchangeType === 'BUY'
            ? currentPrice + currentPrice * (value.margin / 100)
            : currentPrice - currentPrice * (value.margin / 100);

        let d = `NGN ${computedMargin * value.exchangeRate}`;
        return d;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
