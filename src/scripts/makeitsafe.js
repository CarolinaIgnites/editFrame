// TODO: Clean up. Not really wriotten for modules and a bit of a hack as is.
// Imports should be better, also may as well make this a proper javascript
// class opposed to whatever this is.

var infiniteLoopDetector = (function() {
  var map = {}

  // define an InfiniteLoopError class
  function InfiniteLoopError(msg, type) {
    Error.call(this ,msg)
    this.type = 'InfiniteLoopError'
  }
  
  function infiniteLoopDetector(id) {
    if (id in map) { // Not the first execution, it can be optimized here, the performance is too low
      if (Date.now() - map[id] > 1000) {
        delete map[id]
        throw new Error('Loop running too long!', 'InfiniteLoopError')
      }
    } else { // First run, record the time the loop started. All the judgments that are not first run are written in the previous if because the above will be executed more times
      map[id] = Date.now()
    }
  }

  infiniteLoopDetector.wrap = function(codeStr) {
    if (typeof codeStr !== 'string') {
      throw new Error('Can only wrap code represented by string, not any other thing at the time! If you want to wrap a function, convert it to string first.')
    }
    // Replaces potential infite loop areas with a bit of guard code that makes
    // and makes sure that the loop doesn't exceed some value of execution time.
    //
    // this is not a strong regex, but enough to use at the time
    let response = codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(loopHead) {
      var id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
      return `infDetector(${id});${loopHead}infDetector(${id});`
    });
    // console.log(response);
    return response;
  }
  infiniteLoopDetector.unwrap = function(codeStr) {
    return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, '')
  }

  return infiniteLoopDetector
}())

module.exports.infiniteLoopDetector = infiniteLoopDetector;

// todo: copied from https://github.com/xieranmaya/infinite-loop-detector/blob/master/infinite-loop-detector.js
