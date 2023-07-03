# kryptochain

## Elements of a block
    Timestamp, Data, CurrentHash, LastHash

## Hash

    npm i crypto-js --save

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

# Learning from
https://github.com/15Dkatz/sf-chain-guides
