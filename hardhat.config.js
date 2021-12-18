require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
private_key = fs.readFileSync(".secret").toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/bcbc76eeffa9478994444b1339f73039`,
      accounts: [private_key],
    },
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
