const SHA256 = require('crypto-js/sha256');

const ChainUtil = require( '../chain-util');

const {DIFFICULTY, MINE_RATE} = require ( '../config');

class Block {
  constructor(  timestamp, data, nounce, difficulty, hash, lastHash  ) {
      this.timestamp = timestamp;
      this.data = data;
      this.nounce = nounce;
      this.difficulty = difficulty;
      this.hash = hash;
      this.lastHash = lastHash;

    }

    toString() {
      return `Block:
  TimeStamp: ${this.timestamp}
  Data: ${this.data}
  Nounce: ${this.nounce}
  Difficulty: ${this.difficulty}
  Hash: ${this.hash.substring(0,10)}
  LastHash: ${this.lastHash.substring(0,10)}`

    }

    static gensis() {
      const gensisDate = new Date('2009', '12', '31', '23', '59', '59', '999');
      const data = ['Zero'];
      const seed = '0-SEED--9';
      const nounce = 0;
      const newHash = Block.hash ( gensisDate.getTime(), seed, data, nounce , DIFFICULTY);
       return new this(  gensisDate.getTime, data , nounce, DIFFICULTY, newHash, seed );
    }

  static mine( data, lastBlock ) {
       let currentTimestamp,newHash;
       let { difficulty } = lastBlock;
       let nounce = 0;
        do {
         currentTimestamp = Date.now();
         nounce++;
         difficulty = Block.adjustDifficulty( lastBlock, currentTimestamp);
         newHash = Block.hash ( currentTimestamp, lastBlock.hash, data, nounce , difficulty );
        } while (newHash.substring(0, difficulty) !== '0'.repeat(difficulty)); // Until leading 0000

        return new this (
          currentTimestamp,
          data,
          nounce,
          difficulty,
          newHash,
          lastBlock.hash
        );

    }

    static hash ( timestamp, lastHash, data, nounce ) {
      return ChainUtil.hash(`${timestamp}${lastHash}${data}${nounce}`).toString();
    }

    static hashBlock ( block ) {
        const { timestamp, data, nounce, difficulty, hash, lastHash } = block;
        return Block.hash( timestamp, lastHash, data, nounce, difficulty );
      }
    
    
    static adjustDifficulty ( lastBlock, currentTimestamp ) {
       let { difficulty } = lastBlock;

       difficulty = lastBlock.timestamp + MINE_RATE > currentTimestamp ?  difficulty + 1: difficulty -1;
       return difficulty;
    }
  } 
module.exports = Block;
