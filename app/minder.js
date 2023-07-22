class Miner {
    constructor( blockchain, transactionPool, wallet, p2pServer ) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer - p2pServer;
    }

    mine () {
        const validTransaction = this.transactionPool.validTransaction();
        // include a reward for the miner

        // create a block 

        // sync the chain to peers

        // clear the transaction pool

        // braodcase to every miner to clean their transaction pool

    }
}

moudule.exports = Miner;
