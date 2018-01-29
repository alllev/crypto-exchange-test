import ProfitCalculator from '../profit-calculator';
import Order from '../order';
import { expect } from 'chai';

describe('Profit calculator', () => {
  console.log('Run profit calculator tests');

  describe('.get()', () => {
    it('should get 0 profit', done => {
      const askOrders = [
        new Order(120, 1)
      ];

      const bidOrders = [
        new Order(100, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.then(result => {
        expect(result).to.be.empty;
        done();
      });
    });

    it('should get 1 profit', done => {
      const askOrders = [
          new Order(10000, 2)
      ];

      const bidOrders = [
          new Order(15000, 1.5)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.then(result => {
        expect(result).to.have.length(1);
        expect(result[0].percent).to.equals(50);
        expect(result[0].amount).to.equals(1.5);
        done();
      });
    });

    it('should get 2 profits', done => {
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
        expect(result[1].percent).to.equals(100);
        expect(result[1].amount).to.equals(3);
        done();
      });
    });

    it('should get empty asks array error', done => {
      const askOrders = [
      ];

      const bidOrders = [
        new Order(120, 1)
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.catch(err => {
        expect(err).to.equals('The asks array is empty');
        done();
      });
    });

    it('should get empty bids array error', done => {
      const askOrders = [
        new Order(120, 1)
      ];

      const bidOrders = [
      ];

      const profitPromise = ProfitCalculator.get(askOrders, bidOrders);
      profitPromise.catch(err => {
        expect(err).to.equals('The bids array is empty');
        done();
      });
    });

    it('should get asks array should less or equal the bids array error', done => {
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
        done();
      });
    });
  });
});
