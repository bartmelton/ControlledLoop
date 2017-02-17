# controlledLoop
A javascript module for moving forward, backward, and in a non-linear fashion through an array or object one or more keys at a time.

## Summary
Creating a controlled-loop allows you to move through an array or object in many different ways
 
  1. iterate similar to generators with `next()`
  2. backup with `previous()`
  3. run in bulk like a `forEach()` but with the ability to stop at any time
  4. chunk or batch a group of items at a time
  5. iterate over every nth item
  6. iterate in reverse 
  7. reverse direction mid-flow
  8. skip over items
  9. goto a specific `key`
  10. Set your own `keys` array to only use a subset of properties or to set the order
  11. change the callback at any time
  
  ### Installing

  #### Homepage
  [http://www.ozonecreations.com/projects/controlled-loop](http://www.ozonecreations.com/projects/controlled-loop)
  
  #### GitHub
  [https://github.com/bartmelton/ControlledLoop](https://github.com/bartmelton/ControlledLoop)
  
  #### NPM
  ```
  npm install controlled-loop
  ```
  
  #### Bower
  ```
  bower install controlled-loop
  ```
   
 

  ### Exports:
  1. It will export as an [AMD module](https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-) if available, otherwise it will try to export as a [CommonJS module](http://www.commonjs.org/)
  2. If [Lodash](https://lodash.com/) or [Underscore](http://underscorejs.org/) are available, it adds as a mixin.
  3. If none of the above options are available it falls back to a global `controlledLoop()` function attached to window, global, or this depending on which is available.
  
  #### Node
  ``` 
  var controlledLoop = require("controlled-loop").controlledLoop 
  ```
  #### Lodash/Underscore
  ``` 
  _.controlledLoop()
  ```
  #### Default
  ``` 
  controlledLoop();
  ```
