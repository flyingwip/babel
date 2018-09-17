
/*
* The decorator demystified
*/


/*
* Method Decorators
* A Method decorator is a function that takes three parameters.
*/

class Cat {
  @logger
  meow(p) { console.log(p) }
};

/*
* The target:
* Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
*/ 
function logger(target, key, descriptor) {
  // console.log(target); //target : Cat {}
  // console.log('------------');
  // console.log(key); //meow
  // console.log('------------');
  // console.log(descriptor); //  { value: [Function: meow,writable: true,enumerable: false,configurable: true }
  console.log("Cat snarling...");
  return descriptor;
}

const cat = new Cat();
cat.meow('Miaaaauw!');

////https://itnext.io/a-minimal-guide-to-ecmascript-decorators-55b70338215e
var myObj = {
    myPropOne: 1,
    myPropTwo: 2
};

console.log(myObj);


function readonly( target, property, descriptor ) {
    descriptor.writable = false;
    return descriptor;
}


class User {
    constructor( firstname, lastName ) {
        this.firstname = firstname;
        this.lastName = lastName;
    }
    @readonly
    getFullName() {
        return this.firstname + ' ' + this.lastName;
    }
}
// create instance
let user = new User( 'John', 'Doe' );

console.log( user.getFullName() );

