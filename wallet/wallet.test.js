const Wallet = require('./index');

const TransactionPool = require( './transaction-pool');

describe('Wallet', () => { 
    let wallet, tp;
    beforeEach( () => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('Create a Transacton', () => { 
        let transaction, sendAmount, recipient;

        beforeEach( () => {
            sendAmount = 52;
            recipient = 're23epuiwfue';

            transaction = wallet.createTransaction ( recipient, sendAmount, tp );

        });
    

        describe('Create 2nd Transaction', () => { 
            beforeEach ( () => {
                transaction = wallet.createTransaction( recipient, sendAmount,tp );
                console.log( transaction );
            });

            it('doubles the sendAmount 2 times' ,()=>{
                expect(
                    transaction.outputs.find ( output => 
                        output.address == wallet.publicKey ).amount
                ).toEqual(wallet.balance - sendAmount *2 );
             });
             

        });
    
     });


 })