'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _desc2, _value2, _class2, _dec, _desc3, _value3, _class3;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/*
* The decorator demystified
*/

/*
* Method Decorators
* A Method decorator is a function that takes three parameters.
*/

var Cat = (_class = function () {
  function Cat() {
    _classCallCheck(this, Cat);
  }

  _createClass(Cat, [{
    key: 'meow',
    value: function meow(p) {
      console.log(p);
    }
  }]);

  return Cat;
}(), (_applyDecoratedDescriptor(_class.prototype, 'meow', [logger], Object.getOwnPropertyDescriptor(_class.prototype, 'meow'), _class.prototype)), _class);
;

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

var cat = new Cat();
cat.meow('Miaaaauw!');

////https://itnext.io/a-minimal-guide-to-ecmascript-decorators-55b70338215e
var myObj = {
  myPropOne: 1,
  myPropTwo: 2
};

console.log(myObj);

function readonly(target, property, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

var User = (_class2 = function () {
  function User(firstname, lastName) {
    _classCallCheck(this, User);

    this.firstname = firstname;
    this.lastName = lastName;
  }

  _createClass(User, [{
    key: 'getFullName',
    value: function getFullName() {
      return this.firstname + ' ' + this.lastName;
    }
  }]);

  return User;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'getFullName', [readonly], Object.getOwnPropertyDescriptor(_class2.prototype, 'getFullName'), _class2.prototype)), _class2);
// create instance

var user = new User('John', 'Doe');

console.log(user.getFullName());

/*
* Method with a new one that logs the arguments, calls the original method and then logs the output.
*/
function log(target, name, descriptor) {
  var original = descriptor.value;
  if (typeof original === 'function') {
    //Note that we’ve used the spread operator here to automatically build an array from all of the arguments provided, which is the more modern alternative to the old arguments value.
    // more on https://davidwalsh.name/spread-operator
    descriptor.value = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log('Arguments: ' + args);
      try {
        var result = original.apply(this, args);
        console.log('Result: ' + result);
        return result;
      } catch (e) {
        console.log('Error: ' + e);
        throw e;
      }
    };
  }
  return descriptor;
}

function log2(name) {
  return function decorator(t, n, descriptor) {
    var original = descriptor.value;
    if (typeof original === 'function') {
      descriptor.value = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        console.log('Arguments for ' + name + ': ' + args);
        try {
          var result = original.apply(this, args);
          console.log('Result from ' + name + ': ' + result);
          return result;
        } catch (e) {
          console.log('Error from ' + name + ': ' + e);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

var Example = (_dec = log2('some tag'), (_class3 = function () {
  function Example() {
    _classCallCheck(this, Example);
  }

  _createClass(Example, [{
    key: 'sum',
    value: function sum(a, b) {
      return a + b;
    }
  }, {
    key: 'sum2',
    value: function sum2(a, b) {
      return a + b;
    }
  }]);

  return Example;
}(), (_applyDecoratedDescriptor(_class3.prototype, 'sum', [log], Object.getOwnPropertyDescriptor(_class3.prototype, 'sum'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'sum2', [_dec], Object.getOwnPropertyDescriptor(_class3.prototype, 'sum2'), _class3.prototype)), _class3));


var e = new Example();
e.sum(1, 2);
e.sum2(3, 4);