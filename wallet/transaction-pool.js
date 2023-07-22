

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction( transaction ) {
        let transactionWithId = this.transactions.find ( t => t.id === transaction.id );

        if ( transactionWithId ) {

            console.log(  'Found Tx:=', this.transactions.indexOf (transactionWithId) );
            this.transactions[ this.transactions.indexOf (transactionWithId) ] = transaction;
        } else {
            this.transactions.push ( transaction );
        }

    }

    existingTransaction( address ) {
        console.log(`address ${address}`);
        if ( this.transactions.length > 0 )
            console.log( `First ${this.transactions[0].input.address}`);
            
        return this.transactions.find(transaction => transaction.input.address === address);

    }
}

module.exports = TransactionPool;
