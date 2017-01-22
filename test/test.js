'use strict';
var controlledLoop=require("controlled-loop");
var testArray=[1,2,3,4,5];
var testObj = {a:1, b:2, c:3, d:4, e:5};
var testFunction=function(v,k){
	console.log("key: "+k+" value: "+v);
	return v;
};
var loop1=controlledLoop(testArray,testFunction);
loop1.run();
var loop2=controlledLoop(testObj,testFunction);
loop2.reverse().run();
