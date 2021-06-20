console.log("Hello Events");

// Browser JS follows event driven programming model
// Anything from DOM to fetching data takes place through events
// Action on event is handled using event Handlers
// There are three ways to handle events:
// 1. Inline (add function to onclick inside html)
// 2. btn.onclick=()
// 3. Externally adding event listener, btn.addEventListener()
let btn=document.getElementById("click-me");
btn.addEventListener("click",(e)=>{
    console.log("Button clicked");
});


// Javascript event loop
// JS is a single threaded application
// It has blocking and nonblocking events

// Event loop for blocking events: JS uses call Stack for blocking events
let func1=()=>{console.log("This is func1");};
let func2=()=>{console.log("This is func2");};

let func3=()=>{
    console.log("Upper part of func3");
    func1();
    func2();
    console.log("Lower part of func3");
};

// func3();

// functions like fetch api or DOM events are async and dont block the call stack
// The non blocking functions enter message Queue which is maintained by a separate thread 
function a(){console.log("This is A");};
function b() {console.log("This is B");};
function c(){

    console.log("This is start of C");
    a();
    setTimeout(b,0);
    console.log("This is end of C");
}

// c();

// From ES6, Promises enter Job Queue where if a promise is resolved before the current function finishes,
// Promise will start executing before any other non blocking func in the message queue
function d(){
    console.log("Starting part of d");
    setTimeout(b,2);
    new Promise((res,rej)=>{
        res("Promise resolved")
    }).then((val)=>{console.log(val);});

    console.log("End part of d");
}

d();

