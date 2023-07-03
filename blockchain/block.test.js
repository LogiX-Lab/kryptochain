const Block = require("./block");
const {DIFFICULTY , MINE_RATE}= require ( '../config');


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

    it("Block Hash meet DIFFICULTY" , () => {
        expect( block.hash.substring(0, block.difficulty )).toEqual ( '0'.repeat( block.difficulty));
    });

    it("Block adjustDiffculty lower", () => {
        expect ( Block.adjustDifficulty( block, block.timestamp + MINE_RATE *2 )).toEqual ( block.difficulty - 1);
    });

    it("Block adjustDiffculty Higher", () => {
        expect ( Block.adjustDifficulty( block, block.timestamp + MINE_RATE * 0.5 ) ).toEqual ( block.difficulty + 1);
    });

} ) ;

