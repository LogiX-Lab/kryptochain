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

# Learning from
https://github.com/15Dkatz/sf-chain-guides
