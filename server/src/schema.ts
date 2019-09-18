import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import { doValidation } from './utils';
import fetch from 'node-fetch';

//MAKE CALL TO COIN DESK API END POINT
async function retrieveBTCPrice() {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  try {
    const response: any = await fetch(url).then(data => data.json());

    const USDPriceObject = response['bpi']['USD'];

    return Number(USDPriceObject['rate_float']);
  } catch (error) {
    return error;
  }
}

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
    //THIS FIELD DOES THE ACTUAL CALCULATION BASED ON ARGS
    calculatePrice: {
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

        const currentPrice = await retrieveBTCPrice();

        const computedMargin =
          value.exchangeType === 'BUY'
            ? currentPrice + value.margin * 100
            : currentPrice - value.margin * 100;

        return `NGN ${computedMargin * value.exchangeRate}`;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
