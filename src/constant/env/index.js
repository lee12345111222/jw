const element = require('./element/index');
const elementTest = require('./element/testnet');
const wallet = require('./wallet/index');
const walletTest = require('./wallet/testnet');
const contract = require('./contract/index');
const contractTest = require('./contract/testnet');
const server = require('./server/index');
const serverTest = require('./server/testnet');
const serverPreview = require('./server/preview');

const config = Object.assign(
  Object.assign(element, wallet),
  Object.assign(contract, server)
);
const test = Object.assign(
  Object.assign(elementTest, walletTest),
  Object.assign(contractTest, serverTest)
);

if (process.env.REACT_APP_ENV === 'test') {
  module.exports = Object.assign(config, test);
} else if (process.env.REACT_APP_ENV === 'preview') {
  module.exports = Object.assign(config, serverPreview);
} else {
  module.exports = config;
}
