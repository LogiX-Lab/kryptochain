const express = require('express');
const BlockChain = require('../blockchain');

const bodyParser = require('body-parser');

const P2PServer = require('./p2p-server');

// HTTP_PORT=3001
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new BlockChain();
const p2pserver = new P2PServer( bc);

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

app.listen( HTTP_PORT, () => {
    console.log( `Listening on port ${HTTP_PORT}`);
})

p2pserver.listen();

module.exports = app;