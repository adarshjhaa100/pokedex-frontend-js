// const { reject } = require("async");




console.log("Welcome to async");

// JS is a single threaded application. But we need some async 
// actions such as responding to users key press
// JS provides ASYNC functionality through Three methods
// 1. Callbacks: Passing a function as an argument to another function
function a(func){
    console.log("Body of a");
    func();
}
function b(){
    console.log("Body of b");
}

// passing b as a function to a
// a(b);

// Callbacks are good but only for simple cases.
// In case we want to nest callback functions, 
// it becomes problematic to keep track of errors

// 2. Promises
// promises are objects that guarantees to returns result of some operation or an error
// promise has two states : pending--->Resolved/Rejected
let workDne=true;
const newPromise=new Promise((resolve,reject)=>{
    if(workDne)
    resolve("Promise returned resolve");
    else
    reject("Rejected promise");
});

// Calling a promise
// newPromise.then((response)=>{console.log(response);})
//             .catch((e)=>{console.log(e);});

// chaining promises
// then(res) is eqv to then((res)=>res) (returns the res )
// if a promise is rejected, all the subsequent promises will be skipped and we will reach the catch()
// fetch("")
//     .then(status)
//     .then(json)
//     .then((data)=>{console.log(data);})
//     .catch((e)=>{console.log(e);});

const arr=Array(1000000).fill(0);
// combinnign promises
let p1=new Promise((resolve)=>{ resolve("hello");});
let p2=new Promise((resolve)=>{arr.forEach((val)=>{}); resolve("hello 2");});

// all(when all promises are resolved)
// Promise.all([p1,p2])
// .then((ans)=>{console.log(ans)})
// .catch((e)=>{console.log(e);});

// race(the first promise to resolve is handled)
// Promise.race([p1,p2])
// .then((ans)=>{console.log(ans)})
// .catch((e)=>{console.log(e);});

// Async / Await
// An async function returns a promise
let doAction=()=>{ return new Promise(
    (res)=>{
        setTimeout(()=>res("Resolved prom"),2000);
    }
);};

// We can return result of a promise to a variable using await
// the method using await should be made async
let execAction=async()=>{
    let prom=await doAction();
    console.log(prom);
}

console.log("Before promise code");
// execAction();
console.log("After promise code");

// Chaining of promises is more elegant this way
//old method
// fetch("")
//     .then(status)
//     .then(json)
//     .then((data)=>{console.log(data);})
//     .catch((e)=>{console.log(e);});
// using await
async function doHello(){
    let res=await fetch("http://127.0.0.1:5500/JsRevision.html");
    let users=await res.status;
    console.log(res,users);

}
doHello();