const Block = require("./block");

const timestamp ='foo-date';
const data =  ['blockchain', 'value'];
const hash ='foo-hash';
const lastHash ='last-hash';

console.log('A test Block');
const block = new Block( 
     timestamp,
    data,
    hash,
    lastHash
);

console.log( block.toString() );

console.log('Gensiss Block');
const testBlock =   new Block( 
    'Gensis Time',
    ['Block','Test'],
    'fir433-has0334', 
    '0-------9' 
);

console.log( testBlock.toString() );


console.log ( Block.gensis().toString() );

console.log('Mine a Block');

console.log( Block.mine( [ 'New' ], Block.gensis() ));