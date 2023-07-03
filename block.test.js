const Block = require("./block");

describe('Block Test', ()=>{ 
    let data, lastBlock, block;

    beforeEach( ()=> {
        data =  ['blockchain', 'value'];
        lastBlock = Block.gensis();
        block = Block.mine ( data, lastBlock);
        console.log( `Before the test, a block mined: ${block}`);
    
    });

    test('Block data is same..', ()=>{
        expect( block.data ).toEqual( data );
    });

    it('Block lastHash is same as LastBlock has', () => {
        expect( block.lastHash).toEqual ( lastBlock.hash );
    }
    );
} ) ;

