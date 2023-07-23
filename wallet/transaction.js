const ChainUtil = require('../chain-util');
const { MINE_REWARD } = require( '../config');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }


  update( senderWallet, recipient, amount ) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);


    if ( amount > senderOutput.amount ) {
      console.log( `Error: Amount:${amount} exceeds Balance`);
      return;
    }

    senderOutput.amount = senderOutput.amount - amount;

    this.outputs.push( { amount, address: recipient} ) ;
    
    Transaction.signTransaction ( this, senderWallet );
    return this;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    // first amount - debit amount from sender wallet
    // secnond amount - credit amount to recipeint
    let outputs = [
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ];

    return Transaction.transactionWithOutputs ( senderWallet, outputs );
  }

  static rewardTransaction( minerWallet, globalChainWallet ) {
    return Transaction.transactionWithOutputs ( globalChainWallet, [
      // amount credit to miner wallet
      {amount: MINE_REWARD, address: minerWallet.publicKey}
    ]);
  }

  // Create transacton with ouputs known
  static transactionWithOutputs ( senderWallet, outputs ) {
    const transaction = new this();
    transaction.outputs.push( ... outputs );
    Transaction.signTransaction( transaction, senderWallet );
    return transaction;
  }

  static signTransaction ( transaction, senderWallet ) {
    transaction.input = {
      timestamp: Date.now(), 
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(  ChainUtil.hash ( transaction.outputs) )
    }
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }

}

module.exports = Transaction;