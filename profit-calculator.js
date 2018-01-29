import Order from './order';
import Profit from './profit';

class ProfitCalculator {
  static get(askOrders, bidOrders) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(askOrders)) {
        reject('The asks object is not array');
      }
      if (!Array.isArray(bidOrders)) {
        reject('The bids object is not array');
      }
      if (askOrders.length === 0) {
        reject('The asks array is empty');
      }
      if (bidOrders.length === 0) {
        reject('The bids array is empty');
      }
      if (askOrders.length > bidOrders.length) {
        reject('The asks array should less or equal than bids array');
      }

      let profitResult = [];
      let bidOrderIdx = 0;
      askOrders.forEach((askOrder) => {
        const bidOrder = bidOrders[bidOrderIdx];
        if (askOrder.amount > 0 && bidOrder.amount > 0 && askOrder.rate > 0) {
          if (askOrder.rate <= bidOrder.rate) {
            const orderAmount = askOrder.amount > bidOrder.amount ? bidOrder.amount : askOrder.amount;
            const profit = Profit.create(askOrder.rate, bidOrder.rate, orderAmount);
            //profitResult.push({profit, askOrder, bidOrder});
            profitResult.push(profit);
          }
        }
        bidOrderIdx = bidOrderIdx + 1;
      });

      resolve(profitResult);
    });
  }

  static createOrders(params) {
    const compareOrders = (o1, o2) => {
      if (params.sortType === 'desc') {
        return o2.rate - o1.rate;
      }
      return o1.rate - o2.rate;
    };
    const getRandomFromRage = (min, max) => {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    };
    let orders = [];

    if (params.count === 0) {
      return orders;
    }

    if (params.minRate < 0 || params.maxRate < 0 || params.maxRate <= params.minRate) {
      return orders;
    }

    if (params.minAmount < 0 || params.maxAmount < 0 || params.maxAmount <= params.minAmount) {
      return orders;
    }

    for (let i = 0; i < params.count; i = i + 1) {
      const rate = parseFloat(getRandomFromRage(params.minRate, params.maxRate).toFixed(2));
      const amount = getRandomFromRage(params.minAmount, params.maxAmount);
      let order = new Order(rate, amount);
      orders.push(order);
    }

    return orders.sort(compareOrders);
  }
}

export default ProfitCalculator;
