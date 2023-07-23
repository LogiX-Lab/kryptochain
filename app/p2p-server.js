const WebSocket = require( 'ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS? process.env.PEERS.split(',') :[];

// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start
const MESSAGE_TYPES = {
    chain: 'CHAIN', 
    transaction: 'TRANSACTION',
    transaction_clear: 'TRANSACTION_CLEAR'
}


class P2PServer {
    constructor( blockchain, transactionPool ) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    
    }
    listen () {
        const server = new WebSocket.Server( { port: P2P_PORT});
        server.on ('connection', socket => {
            this.connectSocket( socket );
        });
        this.connectToPeers();
        console.log( `Listeneing p2p on: ${P2P_PORT}` );

    }

    connectSocket ( socket ) {
        this.sockets.push( socket );
        console.log('Socket Connected:', socket.url );

        // recv rom peer
        this.messageHander( socket );

        // send to peer
        this.sendChain ( socket );
    }

    // Input to update chain
    messageHander( socket ) {
        socket.on('message', message=> {
            const msg = JSON.parse( message);
            console.log( `Recv message from ${socket.url} @${P2P_PORT}:`, msg);
            switch ( msg.type ) {
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain( msg.payload );
                    break;
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateOrAddTransaction( msg.payload );
                    break;
                case MESSAGE_TYPES.transaction_clear:
                    this.transactionPool.clear();
                    break;    
            }
        })

    }

    // Sync out the chain
    //  { type: MESSAGE_TPES.chain, payload: chain }
    //
    //
    sendChain ( socket ) {
        socket.send( JSON.stringify( 
            {   type: MESSAGE_TYPES.chain,
                payload: this.blockchain.chain
            }     
            ));
    }
    syncChains () {
        // Re-try
        this.connectToPeers();

        this.sockets.forEach( socket => {
            this.sendChain ( socket );
        })
    }

    // Broadcast the Transaction
    sendTransaction( socket, transaction ) {
        socket.send( JSON.stringify( 
            {   type: MESSAGE_TYPES.transaction,
                payload: transaction
            }     
            ));
    }
    
    broadcastTransaction( transaction ) {
        this.sockets.forEach ( socket => {
            this.sendTransaction ( socket, transaction )
        })
    }

    // Broadcase the clear
    broadcastTransactionClear() {
        this.sockets.forEach ( socket => {
            this.clearTransaction ( socket )
        })
    }

    clearTransaction( socket  ) {
        socket.send( JSON.stringify( 
            {   type: MESSAGE_TYPES.transaction_clear,
                payload: 'Clear the Transacton'
            }     
            ));
    }

    connectToPeers () {
        peers.forEach ( peer => {
                const socket = new WebSocket(peer);
                socket.on('open', () => {
                    this.connectSocket ( socket );
                });
                socket.on('error',()=> {
                    console.log('Error');
                })

        })
    }
}

module.exports = P2PServer;
