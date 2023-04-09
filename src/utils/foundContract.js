import Web3 from 'web3';

export const foundContract = (contractAbi, contractAddress) =>
  new new Web3(ethereum).eth.Contract(contractAbi, contractAddress);
