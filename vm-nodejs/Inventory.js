const fs = require('fs');
const Item = require('./Item');
const Money = require('./Money'); // Import your Money class as needed.

class Inventory {
  /**
   * Create an Inventory instance with an initial balance.
   * @param {readline.Interface} rl - The readline interface for user input.
   */
  constructor(rl) {
    this.inventoryList = [];
    this.itemNumber = '';
    this.itemName = '';
    this.itemCost = new Money(0, rl);
    this.itemType = '';
    this.rl = rl;
  }

  /**
   * Load inventory data from a CSV file and populate the inventory list.
   */
  loadInventory() {
    const inventoryFile = 'vendingmachine.csv';
    const fileData = fs.readFileSync(inventoryFile, 'utf8');
    const lines = fileData.split('\n');

    lines.forEach((line) => {
      const itemLine = line.split(',');
      const inventoryItem = new Item(itemLine[0], itemLine[1], parseFloat(itemLine[2]), itemLine[3], 5);
      this.inventoryList.push(inventoryItem);
    });
  }

  /**
   * Display the vending machine menu with item details and availability.
   */
  vendingStartup() {
    console.log('\n*******************************************************');
    console.log(" Welcome to the world's most AMAZING vending machine!");
    console.log('*******************************************************');
    this.loadInventory();
  }

  /**
   * Display the vending machine menu with item details and availability.
   */
  displayList() {
    console.log('\n*** MENU ***\n');

    const maxItemNameLength = this.inventoryList.reduce(
      (maxLength, item) => Math.max(maxLength, item.getItemName().length),
      0
    );

    this.inventoryList.forEach((item) => {
      const itemName = item.getItemName();
      const formattedPrice = item.getItemCost();
      const padding = ' '.repeat(maxItemNameLength - itemName.length);

      console.log(
        `${item.getItemNumber()} | ${itemName}${padding} | $${parseFloat(formattedPrice).toFixed(2)} (x${item.getItemQuantity()})`
      );
    });
  }

  /**
   * Handle the purchase of an item by reducing its quantity and updating the balance.
   * @param {Money} balance - The Money instance representing the current balance.
   */
  async purchaseItem(balance) {
    console.log('\n*** What product would you like to purchase? ***');
    this.displayList();
    const itemSelection = await this.promptItemSelection();

    for (const item of this.inventoryList) {
      const itemCost = item.getItemCost();
      if (itemSelection === item.getItemNumber() && item.getItemQuantity() > 0 && itemCost <= balance.getBalance()) {
        item.setItemQuantity(item.getItemQuantity() - 1);
        balance.setBalance(balance.getBalance() - itemCost);
        this.itemNumber = item.getItemNumber();
        this.itemName = item.getItemName();
        this.itemCost = itemCost;
        console.log(`\n*** [${item.getItemName()}] purchased for $${itemCost.toFixed(2)}. Balance: $${balance.getBalance().toFixed(2)}. ***`);
        item.playItemSounds();
        this.logEntry(balance);
        return;
      } else if (itemCost > balance.getBalance() && itemSelection === item.getItemNumber()) {
        const changeNeeded = itemCost - balance.getBalance();
        console.log(`\n*** You need $${changeNeeded.toFixed(2)} more to purchase this item. ***`);
        return;
      } else if (item.getItemQuantity() === 0 && itemSelection === item.getItemNumber()) {
        console.log('\n*** OUT-OF-STOCK ***');
        return;
      }
    }

    console.log('\n*** INVALID SELECTION ***');
  }

  /**
   * Prompt the user for item selection.
   * @returns {Promise<string>} A Promise that resolves to the selected item's code.
   */
  async promptItemSelection() {
    return new Promise((resolve) => {
      this.rl.question('Enter selection: ', (itemSelection) => {
        resolve(itemSelection.toUpperCase());
      });
    });
  }

  /**
   * Log the purchase entry in the transaction log.
   * @param {Money} balance - The Money instance representing the current balance.
   */
  logEntry(balance) {
    const logFile = 'Log.txt';
    const logDateTime = new Date().toLocaleString();

    const logLine = `${logDateTime} ${this.itemName} ${this.itemNumber} $${this.itemCost} $${balance.getBalance()}\n`;

    fs.appendFileSync(logFile, logLine, 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

module.exports = Inventory;
