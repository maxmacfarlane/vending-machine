const readline = require('readline');
const ApplicationMenu = require('./ApplicationMenu')

class Application {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.menu = new ApplicationMenu(this.rl);
  }

  async run() {
    await this.menu.run();
  }

  close() {
    this.rl.close();
  }
}

async function main() {
  const cli = new Application();
  await cli.run();
  cli.close();
}

main();

module.exports = Application;