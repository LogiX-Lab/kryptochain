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

npm run start-dev

HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run start-dev
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start-dev

## elliptic
    npm i elliptic --save

##
    npm i uuid --save

## Docker

docker build -t kryptochain.img.1 ./

docker run -p 3001:3001 -p 5001:5001 --name kyptochain.s1 kryptochain.img.1 

## docker-compose
Luanch the 3 peers

### Resolve ws socket inter-container 

    Using the container name ( not localhost )

      - PEERS=ws://kryptochain_srv1:5001
      - PEERS=ws://kryptochain_srv1:5001,ws://kryptochain_srv2:5002

# Learning from
https://github.com/15Dkatz/sf-chain-guides
