class Profit {
  constructor(percent, amount) {
    this.percent = percent;
    this.amount = amount;
  }

  static create(askOrderRate, bidOrderRate, orderAmount) {
    let percent = (bidOrderRate - askOrderRate) / askOrderRate * 100;
    percent = parseFloat(percent.toFixed());
    return new Profit(percent, orderAmount);
  }
}

export default Profit;
