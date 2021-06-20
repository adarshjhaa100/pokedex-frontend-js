console.log("Hello World");

// Three ways to define a variable: var, let and const
// var vs let: variable delclared with var(outside any function) has global scope
var var1; // undefined var
let var2 = 22;
const const1 = undefined; // should be initialized

// Primitive datatypes:
//  Numbers: numerical value represented by a 64 bit double value
//  String: set of characters
//  Boolean: true or false
let num = 12; // integer number
let flo = 12.34; //floating point
// String using template literal
let name1 = `My name is Adarsh Jha and age is ${num}`; //string
// console.log(name1);

// Missing number
// Two ways to denote: undefined, null
// undefined: we haven't defined a declared variable
// null: have removed the object for the memory to whcih the var is pointing

// JS object
// ANything that's not primitive a an Object in JS
// A JS object by default inherits from __proto__() which contains
// methods like toString, getters, setters etc
let student = {
  name: "Adarsh",
  age: 20,
};
let students = [student, student, student];
// console.log(student, students);

// ES6 class
class Person {
  constructor(name) {
    this.name = name;
  }
  showObject() {
    return `Name of the person is ${this.name}`;
  }
}
let person = new Person("A");
// console.log(person.showObject());

// ES6 inheritance
class Student extends Person {
  constructor(name, marks) {
    super(name);
    this.marks = marks;
  }
  showObject() {
    return `name of the Student is ${this.name} and marks is ${this.marks}`;
  }
}

let student1 = new Student("Adarsh", [1, 2, 3, 4]);
// console.log(student1.showObject());

// To declare a getter or a setter, just add get or set keyword before method name
// similar for static variables

//Exception handling
function divide(a, b) {
  if (b == 0) throw "Cannot divde by zero";
  return a / b;
}

try {
  let ans = divide(1, 0);
  console.log(ans);
} catch (e) {
  console.log(`An exception occured: ${e}`);
} finally {
  console.log("Do something which you want to occur in every case");
}

// Functions
// Regular function
function calcSum(a, b) {
  return a + b;
}

// Arrow function
let calcDiff = (a, b) => {
  return a - b;
};

// Difference between arrow and normal function
// "this" object: regular function is able to access the object's context(this)
// arrow function is not able to access it. It just acceses this of the latest context in call stack
// here, arrow function has access to the context of Window object
let personNew={
    "name":"Sam",
    "getRegular":function(){console.log(`name is ${this.name}`);},
    "getArrow":()=>{console.log(`name is ${this}`);}
};

// Note: When it's requried to call "this" inside a callback, make it a regular function
personNew.getRegular();
personNew.getArrow();

