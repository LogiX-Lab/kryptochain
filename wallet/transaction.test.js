const Transaction = require('./transaction');
const Wallet = require('./');
const { MINE_REWARD } = require('../config');

describe ( 'Transaction', ()=> {
    let transaction, wallet, recipient, amount;

    beforeEach( ()=> {
        wallet = new Wallet();
        amount = 15;
        recipient = 're232322';
        transaction = Transaction.newTransaction( wallet, recipient, amount);
    });

    it('Transaction Output of Sender',  () => {
        expect( transaction.outputs.find(  output => output.address == wallet.publicKey ).amount )
            .toEqual( ( wallet.balance - amount ) );
    });

    it('Transaction Input', () => {
        expect ( transaction.input.amount ).toEqual( wallet.balance );
    });

    it('Transaction Verified', () => {
        expect ( Transaction.verifyTransaction(transaction ) ).toBe ( true );
    })

    describe('Update a transaction', () => {
        let nextAmount, nextRecipient;

        beforeEach( () => {
            nextAmount = 20;
            nextRecipient ='nxt31328302y';
            transaction = transaction.update( wallet, nextRecipient, nextAmount);
            console.log ( transaction );
        });

        it('Update Transaction Ouput of Sender', () => {
            const senderOutput = transaction.outputs.find(output => output.address === wallet.publicKey);
            expect ( senderOutput.amount )
                .toEqual ( wallet.balance - amount - nextAmount )
        });

        it ('Transaction Ouput of Next Recipient', ()=> {
            const nextRecipientOuput = transaction.outputs.find(output => output.address === nextRecipient);
            expect( nextRecipientOuput.amount )
                .toEqual ( nextAmount );
        });

    });

    describe( 'Create Reward Transacton', () => {
        beforeEach( () => {
            wallet = new Wallet();
            transaction  = Transaction.rewardTransaction( wallet, Wallet.globalChainWallet() ) ;

        });

        it( 'Mine Reward', () => {

            expect( transaction.outputs.find(  output => output.address === wallet.publicKey ).amount )
                .toEqual ( MINE_REWARD );
        } );
    })
});
