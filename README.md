# Node.js Vending Machine

This is a command-line vending machine application implemented in Node.js. It simulates the operation of a vending machine, allowing users to view available items, deposit money, make purchases, and receive change. The application maintains an inventory of items with their names, prices, and quantities, and it logs transactions.

## Features

- Display a list of available items in the vending machine.
- Deposit money ($1, $5, $10, $20 bills only).
- Select and purchase items.
- Provide change in quarters, dimes, and nickels.
- Log all transactions, including purchases and money deposits.

## Prerequisites

Before running the application, make sure you have the following software and dependencies installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/maxmacfarlane/vending-machine.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vending-machine
   ```

3. Install the required npm packages:

   ```bash
   npm install
   ```

## Usage

To run the vending machine application, use the following command:

```bash
node app.js
```

The application will start, and you will see a menu with options to:

- Display vending machine items.
- Deposit money.
- Select a product to purchase.
- Finish the transaction.

Follow the on-screen instructions to interact with the vending machine.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was built as a learning exercise and is based on a simple vending machine simulation.