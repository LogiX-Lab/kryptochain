const Block = require("./blockchain/block");
const {DIFFICULTY , MINE_RATE}= require ( './config');

const timestamp ='foo-date';
const data =  ['blockchain', 'value'];
const hash ='foo-hash';
const lastHash ='last-hash';

console.log('A test Block');
const block = new Block( 
     timestamp,
    data,
    0,
    DIFFICULTY,
    hash,
    lastHash
);

console.log( block.toString() );

console.log('Gensiss Block');
const testBlock =   new Block( 
    'Gensis Time',
    ['Block','Test'],
    0,
    DIFFICULTY,    
    'fir433-has0334',
    '0-------9' 
);

console.log( testBlock.toString() );


console.log ( Block.gensis().toString() );

console.log('Mine a Block');

for ( let i =0; i< 100; i++)
console.log( Block.mine( [ 'New', i ], Block.gensis() ).toString() );