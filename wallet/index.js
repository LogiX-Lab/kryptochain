const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool');
const { INITIAL_BALANCE } = require('../config');
const e = require('express');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
	  this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
}

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }

  sign( dataHash ) {
    return this.keyPair.sign ( dataHash );
  }

  createTransaction ( recipient, amount, transactionPool) {
    
    if ( amount > this.balance) {
      console(`Error: ${amount} exceed ${this.balance}`);
      return;
    }

    let transaction = transactionPool.existingTransaction( this.publicKey );


    if ( transaction ) {
      console.log( `Found:${transaction.id}` );
      transaction.update ( this, recipient, amount );
    } else {
      transaction = Transaction.newTransaction( this, recipient, amount );
      transactionPool.updateOrAddTransaction( transaction );

    }

    return transaction;

  }

  static globalChainWallet() {
    const globalChainWallet = new this();
    globalChainWallet.address = 'BlockChain-Wallet';
    globalChainWallet.balance = 0;
    return globalChainWallet;
  }

}

module.exports = Wallet;