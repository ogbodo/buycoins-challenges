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
export default retrieveBTCPrice;
