import ProfitCalculator from './profit-calculator';

const paramsAsk = {
    minRate: 100,
    maxRate: 1000,
    minAmount: 0.5,
    maxAmount: 5,
    count: 200,
    sortType: 'asc'
};

const paramsBid = {
    minRate: 100,
    maxRate: 1000,
    minAmount: 0.3,
    maxAmount: 15,
    count: 200,
    sortType: 'desc'
};

const askOrders = ProfitCalculator.createOrders(paramsAsk);
const bidOrders = ProfitCalculator.createOrders(paramsBid);

const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
profitPromise.then(result => {
  for (let profit of result) {
    console.log(profit);
  }
}, error => {
  console.error(error);
});

