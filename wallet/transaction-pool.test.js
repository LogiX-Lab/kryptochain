const TransactionPool = require('./transaction-pool');
const Transaction = require ( './transaction');
const Wallet = require ('./index');

describe('Transaction Pool', () => { 

    let tp, wallet, transaction;

    beforeEach( () => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction ( wallet, 'rc2e8upfijas', 30);

        tp.updateOrAddTransaction ( transaction );
    });

    it('Add a Transaction ', () => {
        expect( tp.transactions.find( t => t.id = transaction.id ) ).toEqual( transaction );
    });

    it('Update Transaction ', () => {
        
    });
 })