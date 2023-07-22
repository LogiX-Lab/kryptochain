const TransactionPool = require('./transaction-pool');
const Transaction = require ( './transaction');
const Wallet = require ('./index');

describe('Transaction Pool', () => { 

    let tp, wallet, transaction;
    let recipient;

    beforeEach( () => {
        tp = new TransactionPool();
        wallet = new Wallet();

        recipient = 'rc2e8upfijas';
 
        transaction = wallet.createTransaction( recipient, 30, tp );
    });

    it('Added a Transaction ', () => {
        expect( tp.transactions.find( t => t.id === transaction.id ) ).toEqual( transaction );
    });

    it('Update Transaction to the pool', () => {
        const newRecipient = 'foo-322322';
        const newTransaction = transaction.update( wallet, newRecipient , 40 );
        
        expect( newTransaction.id ).toEqual( transaction.id);


        expect ( (newTransaction.outputs.find( o => o.address === recipient ) ).amount  ).toEqual ( 30 );


        expect ( (newTransaction.outputs.find( o =>  o.address === newRecipient) ).amount  ).toEqual ( 40 );
    });

    describe('Valid Transaction', () => {
        let validTransactions;

        beforeEach( () => {
            //Existing valid tx
            validTransactions = [...tp.transactions];

            //genearate 6 new tx for new Wallet, invalidate halves 
            for ( let i=0; i< 6; i++) {
                let newWallet = new Wallet();
                let newTx = newWallet.createTransaction ( 're-23223d', 55, tp );
                if ( i%2 === 0 ) {
                    //Invalid tx
                    newTx.input.amount = newTx.input.amount +1;
                } else {
                    validTransactions.push ( newTx );
                }

            }


        });


        it( 'validTransactions  === tp.validTransactions' , () => {


            expect ( validTransactions ).toEqual ( tp.validTransactions() );

        });


    });
 })