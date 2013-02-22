  if (typeof setImmediate !== 'function') {
    // Asynchronous setImmediate
    
    setImmediate = function setImmediate(func, param) {
        'use strict';
        return setTimeout(function () {
            func(param);
        }, 0);
    };

    // Synchronous setImmediate
    // setImmediate = function(func, param) {
    //   func(param);
    // };
  }

  function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
  }