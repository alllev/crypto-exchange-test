import ProfitCalculator from '../profit-calculator';
import Order from '../order';
import { expect } from 'chai';

describe('Profit calculator', () => {
  console.log('Run profit calculator tests');

  describe('.get()', () => {
    it('should get 0 profit', () => {
      const askOrders = [
        new Order(100, 1)
      ];

      const bidOrders = [
        new Order(80, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.then(result => {
        expect(result).to.be.empty;
      });
    });

    it('should get 1 profit', () => {
      const askOrders = [
        new Order(100, 1)
      ];

      const bidOrders = [
        new Order(120, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.then(result => {
        expect(result).to.have.length(1);
        expect(result[0].percent).to.equals(20);
        expect(result[0].amount).to.equals(1);
      });
    });

    it('should get 2 profits', () => {
      const askOrders = [
        new Order(100, 1),
        new Order(200, 3)
      ];

      const bidOrders = [
        new Order(120, 1),
        new Order(400, 5)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.then(result => {
        expect(result).to.have.length(2);
        expect(result[1].percent).to.equals(300);
        expect(result[1].amount).to.equals(3);
      });
    });

    it('should get empty asks array error', () => {
      const askOrders = [
      ];

      const bidOrders = [
        new Order(120, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.catch(err => {
        expect(err).to.equals('The asks array is empty');
      });
    });

    it('should get empty bids array error', () => {
      const askOrders = [
        new Order(120, 1)
      ];

      const bidOrders = [
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.catch(err => {
        expect(err).to.equals('The bids array is empty');
      });
    });

    it('should get asks array should less or equal the bids array error', () => {
      const askOrders = [
        new Order(120, 1),
        new Order(200, 5)
      ];

      const bidOrders = [
        new Order(200, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.catch(err => {
        expect(err).to.equals('The asks array should less or equal than bids array');
      });
    });
  });
});
