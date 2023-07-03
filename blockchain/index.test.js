const BlockChain = require('./index');
const Block = require ('./block');

describe ( 'BlockChain Test', () => {
    let bc, bc2;
    beforeEach (
        () => {
            bc = new BlockChain();
            bc2 = new BlockChain();
        }
    )

    it('Start with gensis block ', () =>{
        expect( bc.chain[0]).toEqual( Block.gensis() );
    });

    it('Add new Block', ()=>{
        const data = [ 'My New Data'];
        const newBlock =  bc.addBlockData ( data );
        expect( newBlock.data ).toEqual ( data);

    });

    it('Chain validatoin', () => {
        bc2.addBlockData( 'New New');
        //expect (  bc.isValidChain( bc2.chain)).toBe( true );
    });

    it('Invalid Geneis Block', ()=> {
        bc2.chain[0].data= "Bad Bad";
        
        //expect (  bc.isValidChain( bc2.chain)).toBe( false );
    });

    it('Invalid  Block', ()=> {
        bc2.addBlockData( 'New New');
        bc2.chain[1].data = 'Bad Bad';
        //expect (  bc.isValidChain( bc2.chain)).toBe( false );
    });

    it ('Releace a valid chain ', ()=> {
        bc2.addBlockData('Boo');
        bc2.addBlockData('Foo');

        bc.replaceChain( bc2.chain);

        expect( bc.chain ).toEqual( bc2.chain );
    });

    it ('Not Releace a shorter chain ', ()=> {
        bc.addBlockData('Foo1');
        bc.addBlockData('Foo2')

        bc2.addBlockData('Boo1');

        bc.replaceChain( bc2.chain);

        expect( bc.chain ).not.toEqual( bc2.chain );
    });

    it ('Not Releace a Invalid chain ', ()=> {

        bc2.addBlockData('Boo1');
        bc2.chain[1].data='Bad Boo1';

        bc.replaceChain( bc2.chain);

        expect( bc.chain ).not.toEqual( bc2.chain );
    });
  
})