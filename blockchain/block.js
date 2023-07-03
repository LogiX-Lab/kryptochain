const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(  timestamp, data, hash, lastHash  ) {
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash;
      this.lastHash = lastHash;
    }

    toString() {
      return `Block:
  TimeStamp: ${this.timestamp}
  Data: ${this.data}
  Hash: ${this.hash.substring(0,10)}
  LastHash: ${this.lastHash.substring(0,10)}`

    }

    static gensis() {
      const gensisDate = new Date('2009', '12', '31', '23', '59', '59', '999');
      const data = ['Zero'];
      const seed = '0-SEED--9';
      const newHash = Block.hash ( gensisDate.getTime(), seed, data );
       return new this(  gensisDate.getTime, data , newHash, seed );
    }

    static mine( data, lastBlock ) {
        const currentTimestamp = Date.now();
        
        const newHash = Block.hash ( currentTimestamp, lastBlock.hash, data );

        return new this (
          currentTimestamp,
          data,
          newHash,
          lastBlock.hash
        );

    }

    static hash ( timestamp, lastHash, data ) {
      return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

  static hashBlock ( block ) {
      const { timestamp, data, hash, lastHash } = block;
      return Block.hash( timestamp, lastHash, data);
    }
  }

module.exports = Block;
