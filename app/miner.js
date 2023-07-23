const Wallet = require('../wallet');
const Transaction  = require ( '../wallet/transaction');
const TransactionPool = require( '../wallet/transaction-pool' ) ;
const BlockChain = require( '../blockchain');
const P2PServer = require('./p2p-server');


class Miner {
    constructor( blockchain, transactionPool, wallet, p2pServer, globalChainWallet ) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
        this.globalChainWallet =  globalChainWallet;
    }

    mine () {
        const validTransactions = this.transactionPool.validTransactions();

        if ( validTransactions.length === 0 ) {
            console.log( 'No validTransactions to mine');
            return;
        }
        // include a reward for the miner
        validTransactions.push( 
            Transaction.rewardTransaction( this.wallet, this.globalChainWallet )
        );
        // create a block 
        const block = this.blockchain.addBlockData( validTransactions );   
        // sync the chain to peers
            this.p2pServer.syncChains();
        // clear the transaction pool
            this.transactionPool.clear();
        // braodcase to every miner to clean their transaction pool
            this.p2pServer.broadcastTransactionClear();
        return block;    
    }
}

module.exports = Miner;
