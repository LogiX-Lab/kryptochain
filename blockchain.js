const Block = require('./block');

class BlockChain {
    constructor () {
        this.chain = [ Block.gensis() ];
    }

    addBlockData ( data ) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = Block.mine ( data, lastBlock );
        this.chain.push ( newBlock );
        return newBlock;
    }

    //inputChina holder of Block[]
    isValidChain( inputChain ) {
        if ( JSON.stringify( inputChain[0]) !== JSON.stringify( Block.gensis() ) ){
            console.log( 'Block 0:', JSON.stringify( inputChain[0]) );
            console.log( 'Block 0:', JSON.stringify( Block.gensis()) );
            return false;
        }    
        console.log( 'Block---:', inputChain.length );
        for ( let i =1; i< inputChain.length; i++ ) {
            const block = inputChain[i];
            const lastBlock = inputChain[i-1];
            console.log( 'Block---:', JSON.stringify( block ) );
            if ( block.lastHash !== lastBlock.hash) {
                console.log( 'lastHash');
                return false;
            }
            const genHash = Block.hashBlock ( block );
            console.log( 'genHash',genHash );
            console.log( 'hash', block.hash );
            if ( block.hash !== genHash ){
                console.log( 'genHash');
                return false;
            }

        }

        return true;
    
    }

    //newChain holder of Block[]
    replaceChain ( newChain ) {
        if ( newChain.length <= this.chain.length ) {
            console.log("New Chain is not logner");
            return;
        }else if ( !this.isValidChain( newChain) ) {
            console.log("New Chain is not valid");
            return;
        }

        this.chain = newChain;
        console.log( 'Replaced')
    }
}

module.exports = BlockChain;