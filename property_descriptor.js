//https://itnext.io/a-minimal-guide-to-ecmascript-decorators-55b70338215e

var myObj = {
    myPropOne: 1,
    myPropTwo: 2
};


console.log(myObj);

/*
* Now, if we write new value to myPropOne property like below, 
* operation will be successful and we will get the changed value.
*/

myObj.myPropOne = 10;
console.log( myObj.myPropOne ); //==> 10


let descriptor = Object.getOwnPropertyDescriptor(
    myObj,
    'myPropOne'
);
console.log( descriptor );


'use strict';
var myObj = {
    myPropOne: 1,
    myPropTwo: 2
};
// modify property descriptor
Object.defineProperty( myObj, 'myPropOne', {
    writable: false,
    enumerable: false
} );
// print property descriptor
descriptor = Object.getOwnPropertyDescriptor(
    myObj, 'myPropOne'
);
console.log( descriptor );
// set new value
myObj.myPropOne = 2;

console.log('-------------')
console.log(myObj);

// print keys
console.log('-------------')
console.log(
    Object.keys( myObj )
);