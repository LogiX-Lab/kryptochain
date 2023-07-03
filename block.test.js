const Block = require("./block");

describe('Block', ()=>{ 
    const timestamp ='foo-date';
    const data =  ['blockchain', 'value'];
    const hash ='foo-hash';
    const lastHash ='last-hash';

    const block = new Block( {
         timestamp,
        data,
        hash,
        lastHash
    });

    it('has property..' ,()=>{
        expect( block.data ).toEqual ( data );
        expect( block.timestamp).toEqual( timestamp );
    });
} ) ;