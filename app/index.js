const express = require('express');
const BlockChain = require('../blockchain');

const bodyParser = require('body-parser');

const P2PServer = require('./p2p-server');

// Transaction
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const Miner = require('./miner');

// HTTP_PORT=3001
const HTTP_PORT = process.env.HTTP_PORT || 3001;

// Server
const app = express();
// BLock chain
const bc = new BlockChain();

//Transaction 
const wallet = new Wallet();
const txPool = new TransactionPool();

// P2P communcation
const p2pserver = new P2PServer( bc, txPool );

const globalChainWallet = Wallet.globalChainWallet();

const miner = new Miner( bc, txPool, wallet, p2pserver, globalChainWallet );


app.use( bodyParser.json());

app.get('/blocks', ( req, res)=>{
    res.json( bc.chain);
} );

app.post('/mine', (req, res) =>{
    const block = bc.addBlockData( req.body.data );
    console.log( `mined: ${block.toString() } `);

    p2pserver.syncChains();
    
    res.redirect('/blocks');
})

app.get('/mine-transactions', (req, res ) =>  {
    const block = miner.mine();
    if ( block ) { 
        console.log(`---- New block added: ${block.toString()}`);
    }    
    res.redirect('/blocks');

});

app.get('/transactions', (req, res) => {
    res.json( txPool.transactions );
});

app.post('/transact', ( req, res ) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction( recipient, amount, txPool );

    p2pserver.broadcastTransaction ( transaction );
    // res.redirect('/transactions');
    res.json( transaction );

});

app.get('/public-key', (req, res ) => {
    res.json ( {
        publicKey: wallet.publicKey
    });
})

app.listen( HTTP_PORT, () => {
    console.log( `Listening on port ${HTTP_PORT}`);
})

p2pserver.listen();

module.exports = app;