
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


/*
* Method with a new one that logs the arguments, calls the original method and then logs the output.
* https://www.sitepoint.com/javascript-decorators-what-they-are/
*/
function log(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    //Note that we’ve used the spread operator here to automatically build an array from all of the arguments provided, which is the more modern alternative to the old arguments value.
    // more on https://davidwalsh.name/spread-operator
    descriptor.value = function(...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    }
  }
  return descriptor;
}


function log2(name) {
  return function decorator(t, n, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
      descriptor.value = function(...args) {
        console.log(`Arguments for ${name}: ${args}`);
        try {
          const result = original.apply(this, args);
          console.log(`Result from ${name}: ${result}`);
          return result;
        } catch (e) {
          console.log(`Error from ${name}: ${e}`);
          throw e;
        }
      }
    }
    return descriptor;
  };
}


class Example {
  @log
  sum(a, b) {
    return a + b;
  }

   @log2('some tag')
  sum2(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2);
e.sum2(3, 4);