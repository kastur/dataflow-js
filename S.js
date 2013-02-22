var S = (function() {

    function enqueue(q, pfunc, next) {
      var func = pfunc(next);
      q[q.length] = 
      function(value) {
        try {
          func(value);
        } catch (e) {
          console.log("error: " + e);
          //breaker(e);
        }
      };
    }

    return {
      make: function make() {
        var sinks = [];
        return {
          put: function(value) {
            value = JSON.parse(JSON.stringify(value));
            sinks.forEach(function (func) {
              setImmediate(func, value);
            });
          },
          stream: {
            is_stream: true,
            map: function(func) {
              var s = make();
              enqueue(sinks, func, s.put);
              return s.stream;
            } 
          }
        };
      }
    }
  }());