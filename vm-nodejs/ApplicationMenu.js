const fs = require('fs');
const Inventory = require('./Inventory');
const Money = require('./Money');

class ApplicationMenu {
  // Constructor for the ApplicationMenu class
  constructor(rl) {
    // Initialize Readline interface
    this.rl = rl;
    // Initialize the state to 'mainMenu'
    this.state = 'mainMenu';
    // Initialize the Money and Inventory objects
    this.money = new Money(0, rl);
    this.inventory = new Inventory(this.rl);
    // Initialize the vending machine
    this.inventory.vendingStartup();
  }

  // Main application loop
  async run() {
    while (true) {
      switch (this.state) {
        case 'mainMenu':
          await this.mainMenu();
          break;
        case 'purchaseMenu':
          await this.purchaseMenu();
          break;
        default:
          console.log('Invalid state:', this.state);
          return;
      }
    }
  }

  // Main menu functionality
  async mainMenu() {
    console.log('\n***********************');
    console.log('****** Main Menu ******');
    console.log('***********************');

    // Prompt the user for a choice and display available options
    const choice = await this.promptChoice([
      'Display Vending Machine Items',
      'Purchase',
      'Exit',
      '* Sales Report *\n',
    ]);

    // Process the user's choice
    switch (choice) {
      case 'Display Vending Machine Items':
        this.inventory.displayList();
        await this.delay(1500);
        console.log('\n~ Returning to the main menu ~');
        await this.delay(1000);
        break;
      case 'Purchase':
        this.state = 'purchaseMenu';
        break;
      case 'Exit':
        console.log('\nThank you for vending with us. Please come again.');
        process.exit(0);
      case '* Sales Report *\n':
        this.makeSalesReport();
        break;
    }
  }

  // Purchase menu functionality
  async purchaseMenu() {
    console.log('\n***********************');
    console.log('**** Purchase Menu ****');
    console.log('***********************');
    console.log(`Balance: $${this.money.balance.toFixed(2)}\n`);

    // Prompt the user for a choice and display available options
    const choice = await this.promptChoice([
      'Feed Money',
      'Select Product',
      'Finish Transaction\n',
    ]);

    // Process the user's choice
    switch (choice) {
      case 'Feed Money':
        await this.money.feedMoney();
        break;
      case 'Select Product':
        await this.inventory.purchaseItem(this.money);
        break;
      case 'Finish Transaction\n':
        this.logEntry(this.money);
        this.money.finishTransaction();
        this.state = 'mainMenu';
        break;
    }
  }

  // Asynchronous delay function
  async delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // Generate a sales report
  async makeSalesReport() {
    const logDateTime = new Date().toLocaleString().replace(/[/:]/g, '-').replace(',', '').replace(/ /g, '_');
    const filePath = `SalesReport_${logDateTime}.txt`;
    fs.writeFileSync(filePath, `SalesReport from ${logDateTime}\n\n`);

    let totalSales = 0;

    // Iterate through the inventory list to generate sales report
    this.inventory.inventoryList.forEach((item) => {
      const quantitySold = (item.getItemQuantity() - 5) * -1;
      if (quantitySold > 0) {
        fs.appendFileSync(filePath, `${quantitySold} | ${item.getItemName()}\n`);
        totalSales += item.getItemCost() * quantitySold;
      }
    });

    // Append the total sales to the sales report
    fs.appendFileSync(filePath, `\n**TOTAL SALES** $${totalSales.toFixed(2)}`);
    console.log(`\nNew File: ${filePath} created.`);
  }

  // Prompt user for a choice from a list of options
  async promptChoice(options) {
    return new Promise((resolve) => {
      const question = options.map((option, index) => `${index + 1}. ${option}`).join('\n');
      this.rl.question(`${question}\nChoose an option: `, (choice) => {
        const index = parseInt(choice);
        if (index >= 1 && index <= options.length) {
          resolve(options[index - 1]);
        } else {
          console.log('\nInvalid choice. Please try again.\n');
          resolve(this.promptChoice(options));
        }
      });
    });
  }

  // Log an entry in the transaction log
  logEntry(balance) {
    const logDateTime = new Date().toLocaleString();
    const logLine = `${logDateTime} GIVE CHANGE: $${balance.getBalance()} $0\n`;

    fs.appendFileSync('Log.txt', logLine, 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

module.exports = ApplicationMenu;
