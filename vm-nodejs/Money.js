const readline = require('readline');
const fs = require('fs');
const Decimal = require('decimal.js');

class Money {
  /**
   * Create a Money instance with an initial balance.
   * @param {number} balance - The initial balance in dollars.
   * @param {readline.Interface} rl - The readline interface for user input.
   */
  constructor(balance, rl) {
    this.balance = new Decimal(balance).toDecimalPlaces(2);
    this.rl = rl;
  }

  /**
   * Get the current balance in dollars.
   * @returns {number} The current balance.
   */
  getBalance() {
    return this.balance.toDecimalPlaces(2);
  }

  /**
   * Set the balance to a new value.
   * @param {number} balance - The new balance in dollars.
   */
  setBalance(balance) {
    this.balance = new Decimal(balance).toDecimalPlaces(2);
  }

  /**
   * Prompt the user to deposit money into the balance.
   */
  async feedMoney() {
    console.log('\n*** How much money would you like to deposit? ***');
    console.log('*** $1, $5, $10, and $20 ONLY ***\n');

    try {
      const balanceEntry = await this.promptBalanceEntry();

      const currentBalance = this.balance;
      const deposit = Decimal(balanceEntry);

      switch (deposit.toNumber()) {
        case 1:
        case 5:
        case 10:
        case 20:
          if (currentBalance.add(deposit).lte(100)) {
            this.balance = currentBalance.add(deposit);
            console.log(`\n$${balanceEntry} deposited.`);
            this.logEntry(balanceEntry);
            return;
          } else {
            console.log('\n*** Balance may not exceed $100.00. ***');
          }
          break;
        default:
          console.log('\n*** You may only deposit $1, $5, $10, or $20 bills. ***');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  /**
   * Prompt the user for a balance entry.
   * @returns {Promise<Decimal>} A Promise that resolves to the entered amount as a Decimal.
   */
  async promptBalanceEntry() {
    return new Promise((resolve) => {
      this.rl.question('Enter deposit amount: ', (amount) => {
        const parsedAmount = parseFloat(amount);

        if (!Number.isNaN(parsedAmount) && [1, 5, 10, 20].includes(parsedAmount)) {
          resolve(new Decimal(parsedAmount));
        } else {
          console.log('\n*** Invalid deposit amount. Please enter $1, $5, $10, or $20. ***');
          resolve(this.promptBalanceEntry());
        }
      });
    });
  }


  /**
   * Finish the transaction by calculating and returning change in quarters, dimes, and nickels.
   * Resets the balance to zero.
   */
  finishTransaction() {
    // Calculate change in cents
    const changeInCents = this.balance.times(100);

    // Check if there is any change to give
    if (changeInCents.gt(0)) {
      // Calculate quarters, dimes, and nickels
      const quarters = changeInCents.div(25).floor();
      const remainingCentsAfterQuarters = changeInCents.minus(quarters.times(25));

      const dimes = remainingCentsAfterQuarters.div(10).floor();
      const remainingCentsAfterDimes = remainingCentsAfterQuarters.minus(dimes.times(10));

      const nickels = remainingCentsAfterDimes.div(5).floor();

      // Display the change to the user
      if (quarters.gt(0) || dimes.gt(0) || nickels.gt(0)) {
        console.log(`\nYou will receive ${quarters} quarters, ${dimes} dimes, and ${nickels} nickels.`);
        console.log('Thank you for your purchase. You will be returned to the main menu.');
      }
    } else {
      console.log("\n* No change to return. *");
    }

    // Reset the balance
    this.balance = new Decimal(0);
  }

  /**
   * Log the money entry in the transaction log.
   * @param {Decimal} balanceEntry - The amount deposited into the balance.
   */
  logEntry(balanceEntry) {
    const logFile = 'Log.txt';
    const logDateTime = new Date().toLocaleString();
    const logLine = `${logDateTime} FEED MONEY: $${balanceEntry.toFixed(2)} $${this.getBalance().toFixed(2)}\n`;

    fs.appendFileSync(logFile, logLine, 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

module.exports = Money;
