const WebSocket = require( 'ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS? process.env.PEERS.split(',') :[];

// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start

class P2PServer {
    constructor( blockchain ) {
        this.blockchain = blockchain;
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

        this.messageHander( socket );

        this.sendChain ( socket );
    }

    messageHander( socket ) {
        socket.on('message', message=> {
            const data = JSON.parse( message);
            console.log( `Recv data from ${socket.url} @${P2P_PORT}:`, data);

            this.blockchain.replaceChain( data );
        })

    }

    sendChain ( socket ) {
        socket.send( JSON.stringify( this.blockchain.chain ))
    }
    syncChains () {
        // Re-try
        this.connectToPeers();

        this.sockets.forEach( socket => {
            this.sendChain ( socket );
        })
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
