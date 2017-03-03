'use strict';
/**
 * ControlledLoop v2.0.0
 * @copyright Copyright &copy; 2017 Bart Melton
 * @license  {@link https://opensource.org/licenses/MIT MIT}
 * @version 2.0.0
 *
 *
 * @file
 * A javascript module for moving forward, backward, and in a non-linear fashion through an array or object one or more keys at a time.
 *
 *
 * Creating a {@link controlled-loop} allows you to move through an array or object in many different ways
 *
 * 1. iterate similar to generators with {@link controlled-loop.next next()}
 * 2. backup with {@link controlled-loop.previous previous()}
 * 3. run in bulk like a forEach() but with the ability to stop at any time
 * 4. chunk or batch a group of items at a time
 * 5. iterate over every nth item
 * 6. iterate in reverse
 * 7. reverse direction mid-flow
 * 8. skip over items
 * 9. goto a specific key
 * 10. Set your own "keys" array to only use a subset of properties or to set the order
 * 11. change the callback at any time
 *
 * ### Installing
 *
 * #### GitHub
 * ```
 * {@link https://github.com/bartmelton/ControlledLoop}
 * ```
 *
 * #### NPM
 * ```
 * npm install controlled-loop
 * ```
 *
 * #### Bower
 * ```
 * bower install controlled-loop
 * ```
 *
 *
 * ### Terminology:
 * because you can move forward (0 to n) or in reverse (n to 0) the terms `forward` and `backward` can get confusing.
 * - the term `forward` implies the action of {@link controlled-loop.next next()}, regardless of whether you are moving in reverse or not.
 * - the term `backwards` implies the action of {@link controlled-loop.previous previous()}, regardless of whether you are moving in reverse or not.
 * - When operating normally (0-n), `forward` ({@link controlled-loop.next next()}) would be `+1` and `backwards` ({@link controlled-loop.previous previous()}) would be `-1`.
 * - When operating in reverse (n-0), `forward` ({@link controlled-loop.next next()}) would be `-1` and `backwards` ({@link controlled-loop.previous previous()}) would be `+1`.
 *
 * ### Exports:
 * 1. It will export as an {@link https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- AMD module} if available, otherwise it will try to export as a {@link http://www.commonjs.org/ CommonJS module}
 * 2. If [Lodash]{@link https://lodash.com/} or [Underscore]{@link http://underscorejs.org/} are available, it adds as a mixin.
 * 3. If none of the above options are available it falls back to a global {@link controlledLoop} function attached to window, global, or this depending on which is available.
 *
  * @example <caption>Node</caption>
 * var controlledLoop = require("controlled-loop").controlledLoop
 *
 * @example <caption>Lodash/Underscore</caption>
 * _.controlledLoop()
 *
 * @example <caption>default</caption>
 * controlledLoop();
 */




(function(){
/**
 * Creates a {@link controlled-loop} instance.<br>
 * This is not a Class and does not need the `new` operator
 *
 * @example <caption>All parameters</caption>
 * var myArray = [1,2,3,4,5,6,7,8,9,10];
 * var doubleValue = function(v){console.log(v*2); return v*2;};
 * var myOptions = {increment:2, startAt:1};
 * var loop = controlledLoop(myArray, doubleValue, myOptions);
 * // => creates a controlled-loop that will iterate over even numbered values in the array and double them.
 * // => Outputs to the console:
 * // 4
 * // 8
 * // 12
 * // 16
 * // 20
 *
 * @example <caption>Without options</caption>
 * var myArray = [1,2,3,4,5,6,7,8,9,10];
 * var doubleValue = function(v){ console.log(v*2); return v*2;};
 * var loop = controlledLoop(myArray, doubleValue);
 * // => Outputs to the console:
 * // 2
 * // 4
 * // 6
 * // 8
 * // 10
 * // 12
 * // 14
 * // 16
 * // 18
 * // 20
 *
 * @example <caption>Without controller as an option</caption>
 * var myobj = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9, j:10};
 * var myOptions = {keys:['a','d','e','h'], controller: function(v,k){ console.log("Key: "+k); console.log("Value: "+v);}}
 * var loop = controlledLoop(myobj, myOptions);
 * // => Outputs to the console:
 * // Key: a
 * // Value: 1
 * // Key: d
 * // Value: 4
 * // Key: e
 * // Value: 5
 * // Key: h
 * // Value: 8
 *
 * @example <caption>Without options or controller</caption>
 * var myArray = [1,2,3,4,5,6,7,8,9,10];
 * var loop = controlledLoop(myArray);
 * // => creates a controlled-loop that will iterate over all values in the array and echo the value.
 *

 *
 * @function controlledLoop
 * @param {(array|object)} data
 * @param {Controller} [controller] - The callback function, the default function is just an echo
 * @param {Options} [options] - Additional options.
 * @returns {controlled-loop} the controlled loop instance
*/



 /**
  * The controller/callback to be passed into a {@link controlledLoop} function
  *
  * @callback Controller
  * @default function(value){ return value }
  * @param {*} value - The value of the current step in the data
  * @param {(string|number)} key - The key of the current step in the data
	* @param {controlled-loop} loop - The controlled loop instance
  * @param {...*} params - any additional parameters passed in from one of the processing functions (e.g. loop.next(param1, param2))
 */

 /**
 * The options object to be passed into a {@link controlledLoop} function.
 * All properties are optional
 *
 * @typedef {Object} Options
 * @property {number} [increment=1] - How much to increment the position within the {@link options.keys} by each time {@link controlled-loop.next}, {@link controlled-loop.previous}, or {@link controlled-loop.run} are called.
 * @property {StartAt} [startAt=0] - Where to start at within the data if you do not wish for the first element processed to be key 0.
 * @property {array} [keys]	- The object or array keys to iterate through. Can be used for a partial list or sorted list of keys, etc. If not provide, [Object.keys()]{https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys} will be used. If the initial `data` is an array with missing elements (e.g. var a=[]; a[0]=1; a[1]=2; a[12]=3), only the defined keys will be run (e.g. keys=[0,1,12]).
 * @property {boolean} [reverse] - whether to start the loop in reverse
 * @property {boolean|*} [apply] - if `true` then the 'controller' function will be [Function.apply()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply} using the 'data'. If any other non-falsy value, the function will be applied to that.
 * @property {function} [controller=function(v){ return v; }]	- The controller function can be passed in as an options property also. If a controller is passed in both places, this one will take precedence.
 */

 /**
  * The `StartAt` number is used in the initial {@link Options options} and as a parameter for {@link controlled-loop.reset reset()} and {@link controlled-loop.reverse reverse()}
  *
  * The controlled loop maintains an internal array of the keys and its current position within that array.
  *
  * By default, on initialization or {@link controlled-loop.reset reset()}, the current position will be such that when you use {@link controlled-loop.next next()} it will go to position 0 with the keys array (or the end if going in reverse).
  *
  * If you wish to the first element processed to be something other than 0, then use a `StartAt`.
  * For example, if you are incrementing by 3 and want the first element processed to be the 3rd key, the `StartAt` option would be 2 (0,1,2).
  *
  * This is calculated as such:<br>
  * Normal: position = 0 + StartAt - Increment<br>
  * Reversed: position = (length-1) - StartAt + Increment
  *
  * So it is possible that on initialization or {@link controlled-loop.reset reset()} that both {@link controlled-loop.next next()} and {@link controlled-loop.previous previous()} are possible
  *
  * @example <caption>Starting at the 3rd item</caption>
  * var myArray = [1,2,3,4,5,6,7,8,9,10];
  * var myOptions = {increment:3, startAt:2};
  * var loop=controlledLoop(myArray,myOptions);
  * loop.next();
  * // => { value:3, key: 2, done: false, donep:true}
  *
  * loop.reverse(true, 2).next();
  * // => { value:8, key: 7, done: false, donep:true}
  *
  * @typedef {number} StartAt
  * @default 0
  */
	var controlledLoop=function(data,controller,options){
		var loopData=data || [];
		var loopKeys=[];
		var loopOptions={
			increment:1,
			startAt:0,
			keys:[],
			reverse:false,
			apply:null,
			controller:function(v){
				return v;
			}
		};
		var paused=true;
		var values=[];
		var lastReturn={
			key:null,
			value:null
		};
		var done={
			next:false,
			previous:true
		};
		var reversed=false;
		var current=0;
		var last=0;
		var extOpt={};
		var counter=0;

		function extend(base,over){
			for(var x in over){
				base[x]=over[x];
			}
		};
		function args2array(base,args,offset){
			var off=offset||0;
			for(; off<args.length; off++){
				base.push(args[off]);
			}
			return base;
		};

/**
 * The return value from any function which runs the `controller` (e.g. {@link controlled-loop.next next()}, {@link controlled-loop.previous previous()}, {@link controlled-loop.repeat repeat()}, {@link controlled-loop.getLastReturn getLastReturn()})
 *
 * @typedef ReturnValue
 * @type {Object}
 * @property {*} value - the value returned by the `controller`. Will be `undefined` if the process tries to run an "out-of-bounds" data (e.g. using {@link controlled-loop.next next()} after reaching the end of the data)
 * @property {string|number} key - the data key which was processed by the `controller`. Will be `undefined` if the process tries to run an "out-of-bounds" data
 * @property {isDone} done - whether you have hit the end of the the data going `forward`. Attempting {@link controlled-loop.next next()}, or similar will return as "out-of-bounds" result but not move the internal position.
 * @property {isDone} donep - whether you have hit the end of the the data going `backwards.` Attempting {@link controlled-loop.previous previous()}, or similar, will return as "out-of-bounds" result but not move the internal position.
 */

 /**
 * A boolean whether processing has reached the end of the data.
 *
 * If the `increment` is greater than 1, then the position may not be at the last item in the data.
 *
 * It means that you cannot move by the `increment` amount without going "out-of-bounds" (0 or length-1).
 *
 * @example
 * var myArray = [1,2,3,4,5,6,7,8,9,10]; // last = 9
 * var myOptions = {increment:5};
 * var loop=controlledLoop(myArray,myOptions);
 * loop.next();
 * // => { value: 1, key: 0, done: false, donep: true}
 * // internal position = 0
 * // You cannot use previous() because 0-5=-5 which is "out of bounds"
 *
 * loop.next();
 * // => { value: 6, key: 5, done: true, donep: false}
 * // internal position = 5
 * // You cannot use next() because 5+5=10 which is "out-of bounds"
 *
 * @typedef {boolean} isDone
 */

 /**
 *
 * @interface controlled-loop
 */

		var cloop={
/**
 * 	Moves `forward` in the data and runs the `controller` on the key/value pair.
 *	If the instance is not {@link controlled-loop.pause paused} or if the number of iterations has been set, `next()` will continue to call itself until it hits the end of the data, the instance is `paused`, or the number of called iterations have been processed
 *  @see {@link controlled-loop.run run()}
 *
 *	@memberof controlled-loop
 *  @function next
 *  @param {...*} [params] - additional parameters to pass to the `controller`
 *  @return {ReturnValue|controlled-loop}
*/
			next:function(/*...params*/){
				return doDir.apply(cloop,args2array([1,"done"],arguments));
			},
/**
 *	Moves `backwards` in the data and runs the `controller` on the key/value pair.
 *	If the instance is not {@link controlled-loop.pause paused} or if the number of iterations has been set, `previous()` will continue to call itself until it hits the end of the data, the instance is `paused`, or the number of called iterations have been processed
 *
 *  **NOTE:** `previous()` is **_NOT_** the same thing as using {@link controlled-loop.reverse reverse()} or moving from the opposite end. It is moving one `increment` in the opposite direction as {@link controlled-loop.next next()} from the current location.
 *
 * 	@see {@link controlled-loop.runBack runBack()}
 *
 *	@memberof controlled-loop
 *  @function previous
 *  @param {...*} [params] - additional parameters to pass to the `controller`
 *  @return {ReturnValue}
*/
			previous:function(/*...params*/){
				return doDir.apply(cloop,args2array([-1,"donep"],arguments));
			},
/**
 *  Calls the `controller` at the current position in the data
 *
 *  @memberof controlled-loop
 *  @function repeat
 *  @param {...*} [params] - additional parameters to pass to the `controller`
 *  @return {ReturnValue}
*/
			repeat:function(/*...params*/){
				return process.apply(cloop,args2array([0],arguments));
			},
/**
 *	Loops through the data without stopping (like a forEach()).<br>
 *  The equivalent of calling `loop.pause(false).next()`. <br>
 * 	**NOTE: **The `controller` function can call {@link controlled-loop.pause pause()} at any time to return to normal incremental processing.
 *
 *  If the parameter `count` is added, the loop will run `count` times instead of continuously
 *
 *  @example
 *  var myArray = [1,2,3,4,5,6,7,8,9,10];
 *  var loop=controlledLoop(myArray);
 *  loop.run(3);
 *  // is equivalent to
 *  loop.next().next().next();
 *
 *  @see {@link controlled-loop.next next()}
 *
 *	@memberof controlled-loop
 *  @function run
 *  @param {number} [count] - if count is passed, {@link controlled-loop.next next()} will be called for this many iterations. Pass null/false or a number <1 to run fully while passing parameters.
 *  @param {...*} [params] - additional parameters to pass to the `controller`
 *  @return {{controlled-loop}}
*/
			run:function(count/*,...params*/){
				if(count && count>0){
					counter=Math.abs(count);
				}
				cloop.pause(false);
				return cloop.next.apply(cloop,args2array([],arguments,1));
			},
/**
 *	Loops through the data without stopping (like a forEach()).<br>
 *  The equivalent of calling `loop.pause(false).previous()`. <br>
 * 	**NOTE: **The `controller` function can call {@link controlled-loop.pause pause()} at any time to return to normal incremental processing.
 *
 *  If the parameter `count` is added, the loop will run `count` times instead of continuously
 *
 *  @example
 *  var myArray = [1,2,3,4,5,6,7,8,9,10];
 *  var loop=controlledLoop(myArray);
 *  loop.runBack(3);
 *  // is equivalent to
 *  loop.previous().previous().previous();
 *
 *	@see {@link controlled-loop.previous previous()}
 *
 *	@memberof controlled-loop
 *  @function runBack
 *  @param {number} [count] - if count is passed, {@link controlled-loop.previous previous()} will be called for this many iterations.  Pass null or a number <1 to run fully while passing parameters.
 *  @param {...*} [params] - additional parameters to pass to the `controller`
 *  @return {{controlled-loop}}
*/
			runBack:function(count/*,...params*/){
				if(count && count>0){
					counter=Math.abs(count);
				}
				cloop.pause(false);
				return cloop.previous.apply(cloop,args2array([],arguments,1));
			},

/**
 *  Reverses the direction the position is moving within the data
 *
 *  @memberof controlled-loop
 *  @function reverse
 *  @param {object} [options={reset:false, clear:false, position:-1}] - Whether to {@link controlled-loop.reset reset} back to the beginning of the data or to the specified position and whether to {@link controlled-loop.clearValues clear} the values. All 3 properties are optional.
 *  @return {controlled-loop}
*/
			reverse:function(opts){
				var options={
					reset:false,
					clear:false,
					position:-1
				};
				if(opts){
					extend(options,opts);
				}
				loopOptions.increment *= -1;
				reversed= !reversed;
				if(options.reset){
					cloop.reset(options.clear,options.position);
				}
				else if(options.clear){
					cloop.clearValues();
				}
				return cloop;
			},
/**
 *  Returns the position back to the {@link StartAt} or the specified position and optionally clears the values.
 *
 *  @memberof controlled-loop
 *  @function reset
 *  @param {boolean} [clear] - whether to clear the values
 *  @param {startAtNumber} [position] - The position to reset to. This overrides but does not update the {@link StartAt} option. Any position that is out of bounds (<0 or >keys.length-1) will be ignored.
 *  @return {controlled-loop}
*/
			reset:function(clear,position){
				var start=(position!==null && position!==undefined && position>-1 && position<=last)?position:loopOptions.startAt;
				current=(reversed?last-start+(-1*loopOptions.increment):start-loopOptions.increment);
				if(clear){
					cloop.clearValues();
				}
				done={
					next:cloop.isComplete(),
					previous:cloop.isComplete(true)
				};
				return cloop;
			},
/**
 *  Skips over a certain number of keys without processing.<br>
 *  If you try to skip `out-of-bounds`, it will stop at the appropriate end (0 or length-1).
 *
 *  @memberof controlled-loop
 *  @function skip
 *  @param {number} steps - the number of increments to skip. The value can be negative to skip `backwards`.
 *  @param {boolean} execute - whether to run {@link controlled-loop.repeat repeat()} when done moving.
 *  @param {...*} [params] - if execute, the additional data to pass to {@link controlled-loop.repeat repeat()}
 *  @return {controlled-loop|ReturnValue} - if executed, it returns the result, otherwise it returns the loop object
*/
			skip:function(steps,execute/*,...params*/){
				if(reversed){
					steps=-1*steps;
				}
				current+=steps;
				if(current>last){
					current=last;
				}
				else if(current<0){
					current=0;
				}
				return execute?process.apply(cloop,args2array([0],arguments,2)):cloop;
			},
/**
 *  Looks up a specified key and moves the position to that index.
 *
 *  **NOTE:** If the key does not exist, it returns the `out-of-bounds` object and does not move the position.
 *
 * 	@see {@link isDone}
 *
 *  @memberof controlled-loop
 *  @function gotoKey
 *  @param {number|string} key - The key to look for
 *  @param {boolean} execute - whether to run {@link controlled-loop.repeat repeat()} when done moving.
 *  @param {...*} [params] - if execute, the additional data to pass to {@link controlled-loop.repeat repeat()}
 *  @return {controlled-loop|ReturnValue} - if executed, it returns the result, otherwise it returns the loop object
*/
			gotoKey:function(key,execute/*,...params*/){
				var x;
				var found=false;
				for(x=0; x<last; x++){
					if(loopKeys[x]==key){
						current=x;
						found=true;
						break;
					}
				}
				if(!found){
					return {
						value:undefined,
						key:undefined,
						done: done.next,
						donep:done.previous
					}
				}
				return execute?process.apply(cloop,args2array([0],arguments,2)):cloop;
			},
/**
 *  Resets one or more options for the loop. Options can either be a name/value pair or an object with multiple properties.
 *
 *  The following are the properties that can be set
 *	1. increment
 *	2. startAt
 * 	3. apply
 *	4. target
 *	5. controller
 *
 *	@example
 *  var loop=controlledLoop(data)
 *  loop.setOptions("increment",3);
 *  // sets the increment property to 3
 *
 *  loop.setOptions({"increment":3, "startAt":2});
 *  // sets the increment property to 3 and the startAt property to 2
 *
 *	@see {@link Options}
 *
 *	@memberof controlled-loop
 *  @function setOptions
 *  @param {string|object} opt - Either the name of the property to set or an object with multiple properties
 *	@param value - The value to set if the first parameter is of type string.
 *  @return {controlled-loop}
*/
			setOptions:function(opt,value){
				var o=(typeof opt=='object')?opt:{};
				var updateable=["increment","startAt","apply","controller"];
				if(typeof opt=='string'){
					o[opt]=value;
				}
				updateable.forEach(function(v){
					if(o[v]!==undefined){
						loopOptions[v]=o[v];
					}
				});
				updateApply();
				return cloop;
			},
/**
 *  Returns true if you can no longer move `forward` in the data by the increment amount (same as the `done` property in returns)
 *
 *  @see {@link isDone}
 *
 *	@memberof controlled-loop
 *  @function isComplete
 *  @param {boolean} previous - Whether to calculate as 'backward` instead of `forward`. (same as the `donep` property in returns)
 *  @return {boolean}
*/
			isComplete:function(previous){
				var nxt=current+loopOptions.increment;
				if(previous){
					nxt=current-loopOptions.increment;
				}
				return nxt<0||nxt>last;
			},
/**
 *  Toggles the current paused state
 *
 * 	@memberof controlled-loop
 *  @function pause
 *  @param {boolean} [state] - If a value is passed, the paused state will be set to that value
 *  @return {controlled-loop}
*/
			pause:function(state){
				paused=(state===true || state===false)?state:!paused;
				return cloop;
			},
/**
 *  Gets an array of values that have been returned by the 'controller'.
 *
 *	@memberof controlled-loop
 *  @function getValues
 *  @param {boolean} [asObject] - Return an Object of key/return values instead of an array
 *  @return {array|object}
*/
			getValues:function(asObject){
				var ret=values;
				if(asObject){
					ret={};
					loopKeys.forEach(function(v,k){
						ret[v]=values[k];
					});
				}
				return ret;
			},
/**
 *  Gets the value of a single key that has been returned by the 'controller'.
 *
 *	@memberof controlled-loop
 *  @function getValue
 *  @param {string|number} key - the key which you want the processed value for
 *  @param {boolean} [asObject] - Return as an object
 *  @return {*} - either the processed value for the key or if asObject {key:value}
*/
			getValue:function(key,asObject){
				var ret=null;
				loopKeys.forEach(function(v,k){
					if(v==key){
						ret=values[k];
						if(asObject){
							ret={};
							ret[v]=values[k];
						}
						return false;
					}
				});
				return ret;
			},
/**
 *  Clears the values of the loop
 *
 *	@memberof controlled-loop
 *  @function clearValues
 *  @return {controlled-loop}
*/
			clearValues:function(){
				values.length=0;
				return cloop;
			},
/**
 *  Gets the status of the {@link controlled-loop loop}
 *
 *  @see {@link Status}
 *
 * 	@memberof controlled-loop
 *  @function status
 *  @return {Status}
*/

/**
 * @typedef {object} Status
 * @property {number} position - where the internal marker is (the current index in the keys array)
 * @property {number} end - The index of the last item in the keys array (length-1)
 * @property {isDone} done - Whether it is currently complete moving `forward`
 * @property {isDone} donep - Whether it is currently complete moving `backward`
 * @property {number} increment - the current increment amount
 * @property {array} values - An array of the values returned by the `controller`
 * @property {array} keys - the keys for the loop data
 * @property {boolean} reversed - Whether the loop is reversed
 * @property {boolean} paused - Whether the loop is paused
 * @property {boolean} applied - Whether the controller calls are being applied to an object
 * @property {boolean} target - The target the controller is being applied to
 */
			status:function(){
				return {
					position:current,
					end:last,
					done:done.next,
					donep:done.previous,
					increment:Math.abs(loopOptions.increment),
					values:values,
					keys:loopKeys,
					reversed:reversed,
					paused:paused,
					applied:loopOptions.apply
				};
			},
/**
 *  Returns the last return from running the `controller`.<br>
 *	If multiple increments have been executed (such as using {@link controlled-loop.run run()}), this will still return the last {@link controlled-loop.ReturnObject value} generated.
 *
 * 	@memberof controlled-loop
 *  @function getLastReturn
 *  @return {ReturnValue}
 *
*/
			getLastReturn:function(){
				return lastReturn;
			},
/**
 *  Creates a function that can be called within a Promise which will correctly store the value.
 *	The defered function takes a single paramter, the value to be stored, and will then return a {@link ReturnValue} the same as any other call.
 *
 *  To use within your callback, assign loop.defer() before your Promise call, then when your Promise returns, call the defered function with the value you wish you assign.
 *
 *	@example
 *	// looping through an array of URLs one at a time
 *  var loop=controlledLoop(data,function(val,key,loopObj){
 *		var cb=loopObj.defer();
 *		$http.get(val,function(result){
 * 				cb(result.data);
 *				loopObj.next();
 *		});
 *	});
 *
 * 	@memberof controlled-loop
 *  @function defer
 *  @return {Function}
 *
*/
			defer:function(){
				var position=current+0;
				var returnObj={
					value:null,
					key:loopKeys[position],
					done:cloop.isComplete(),
					donep:cloop.isComplete(true)
				};
				return function(val){
					values[position]=val;
					returnObj.value=val;
					return returnObj;
				}
			}
		};

/**
 * Processor for next/previous
 *
 * @function doDir
 * @private
 * @param {number} dir - next=1, previous=-1
 * @param {string} doneType - next="done", previous="donep"
 * @param {...*} [params] - additional parameters to pass to the `controller`
*/
		function doDir(dir,doneType/*,...params*/){
			var wasRunning=!paused;// must be before "ret" in case process changes the state
			var ret=process.apply(cloop,args2array([dir],arguments,2))
			if(ret[doneType]){
				counter=0;
				cloop.pause(true);
			}
			else if(counter>0){
				counter--;
				if(counter==0){
					cloop.pause(true);
				}
			}
			if(paused){
				return wasRunning?cloop:ret;
			}
			return doDir.apply(cloop,arguments);
		}
/**
 * Does the actual processing of an iteration.
 *
 * @function process
 * @private
 * @param {number} dir - Either -1 (previous), 0 (repeat), or 1 (next)
 * @param {...*} [params] - additional parameters to pass to the `controller`
*/
		function process(dir/*,params*/){
			var tmp;
			// calculate the next step
			var nxt=current+(loopOptions.increment * dir);
			var params=null;
			// if the next step will be out of bounds, return the result with no key/value
			if(nxt<0 || nxt>last){
				return {
					value:undefined,
					key:undefined,
					done:(dir==1 || (dir==0 && done.next)),
					donep:(dir==-1 || (dir==0 && done.previous))
				}
			}
			// move the internal marker
			current=nxt;
			params=args2array([loopData[loopKeys[current]],loopKeys[current],cloop],arguments,1);
			tmp=loopOptions.controller.apply(loopOptions.apply,params);
			// put the returned value in our values array
			values[current]=tmp;
			// update the internal done object
			done={
				next:cloop.isComplete(),
				previous:cloop.isComplete(true)
			};
			// update the internal return object
			lastReturn={
				value:tmp,
				key:loopKeys[current],
				done:done.next,
				donep:done.previous
			};
			return lastReturn;
		};

		// make sure that if apply is true and no target, then target = data
		function updateApply(){
			if(!loopOptions.apply){
				loopOptions.apply=null;
			}
			else if(loopOptions.apply===true){
				loopOptions.apply=loopData;
			}
		};

		// check the parameter types, if 3 params (data, controller, options)
		if(controller instanceof Function){
			loopOptions.controller=controller;
			if(options!=null){
				extOpt=options;
			}
		}
		// if 2 params (data, options)
		else if(controller!=null){
			extOpt=controller;
		}
		// if we have options, overwrite the properties onto our default options
		extend(loopOptions,extOpt);

		// if keys were passed, copy them
		if(loopOptions.keys){
			loopKeys=loopOptions.keys
		}
		// if keys were not passed, create them
		if(loopKeys.length==0){
			loopKeys=Object.keys(loopData);
		}
		delete loopOptions.keys;
		updateApply();
		last=loopKeys.length-1;
		// increment cannot be negative (reversing handles this)
		loopOptions.increment=Math.abs(loopOptions.increment);
		// startAt cannot be negative (reversing handles this)
		loopOptions.startAt=Math.abs(loopOptions.startAt);
		if(loopOptions.reverse){
			cloop.reverse();
		}
		delete loopOptions.reverse;
		// reset to make sure the position is at the right place
		cloop.reset();
		return cloop;
	};

	var isExtended=false;

	// Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	if (typeof define === "function" && typeof define.amd == 'object' && define.amd) {
        define({ controlledLoop: controlledLoop });
		isExtended=true;
    }
	// Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to 'var controlledLoop = require("controlledLoop").controlledLoop`.
	else if (typeof exports !== "undefined") {
        exports.controlledLoop = controlledLoop;
		isExtended=true;
    }
	// extend Lodash (https://lodash.com/) and Underscore (http://underscorejs.org/)
	// usage: _.controlledLoop()
	if(typeof _ == "function" && typeof _.mixin=="function"){
		_.mixin({ 'controlledLoop': controlledLoop });
		isExtended=true;
	}


	if(!isExtended){
		// check if "window" exists (web browser) and bind to that
		if (typeof window !== "undefined") {
			window.controlledLoop = controlledLoop;
		}
		// check if "global" exists (Node) and bind to that
		else if (typeof global !== "undefined") {
			global.controlledLoop = controlledLoop;
		}
		// if all else fails, fall back to whatever "this" is
		else{
			this.controlledLoop = controlledLoop
		}
	}

})();
