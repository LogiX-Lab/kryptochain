# kryptochain

## Elements of a block
    Timestamp, Data, CurrentHash, LastHash

## Hash

    npm i crypto-js --save

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

## express
    npm i express --save-dev
## body-parser
    npm i body-parser --save
## WebSocket
    npm i ws --save

HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run start-dev
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start-dev

# Learning from
https://github.com/15Dkatz/sf-chain-guides
