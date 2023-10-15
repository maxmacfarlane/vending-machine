class Item {
  constructor(itemNumber, itemName, itemCost, itemType, itemQuantity) {
    this.itemNumber = itemNumber;
    this.itemName = itemName;
    this.itemCost = itemCost;
    this.itemType = itemType;
    this.itemQuantity = itemQuantity;
  }

  getItemNumber() {
    return this.itemNumber;
  }

  getItemName() {
    return this.itemName;
  }

  getItemCost() {
    return this.itemCost;
  }

  getItemType() {
    return this.itemType;
  }

  getItemQuantity() {
    return this.itemQuantity;
  }

  setItemQuantity(itemQuantity) {
    this.itemQuantity = itemQuantity;
  }

  playItemSounds() {
    switch (this.itemType) {
      case 'Chip':
        console.log('\n~~ Crunch Crunch, It\'s Yummy! ~~');
        break;
      case 'Candy':
        console.log('\n~~ Munch Munch, Mmm Mmm Good! ~~');
        break;
      case 'Drink':
        console.log('\n~~ Glug Glug, Chug Chug! ~~');
        break;
      case 'Gum':
        console.log('\n~~ Chew Chew, Pop! ~~');
        break;
    }
  }
}

module.exports = Item;
