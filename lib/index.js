'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _desc2, _value2, _class2;

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