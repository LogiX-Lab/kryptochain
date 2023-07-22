
const Transaction = require( './transaction');

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
            
        return this.transactions.find(transaction => transaction.input.address === address);

    }

    validTransactions() {
        return this.transactions.filter ( t =>{
            // output total = input amount;
            const outputTotal = t.outputs.reduce((total, output) => {
                return total + output.amount;
              }, 0);

            if ( t.input.amount !== outputTotal) {
                console.log ( `Invalid Transaction Amount: ` );
                console.log ( t );
                return;
            }

            //
            if ( ! Transaction.verifyTransaction ( t ) ) {
                console.log ( `Invalid Transaction Signagure `);
                console.log ( t );
                return;
            }

            return t;

        });
    }
}

module.exports = TransactionPool;
