var infiniteLoopDetector = (function() {
  var map = {}

  // define an InfiniteLoopError class
  function InfiniteLoopError(msg, type) {
    Error.call(this ,msg)
    this.type = 'InfiniteLoopError'
  }
  
  function infiniteLoopDetector(id) {
    if (id in map) { // 非首次执行，此处可以优化，性能太低
      if (Date.now() - map[id] > 1000) {
        delete map[id]
        throw new Error('Loop running too long!', 'InfiniteLoopError')
      }
    } else { // 首次运行，记录循环开始的时间。之所有把非首次运行的判断写在前面的if里是因为上面会执行更多次
      map[id] = Date.now()
    }
  }

  infiniteLoopDetector.wrap = function(codeStr) {
    if (typeof codeStr !== 'string') {
      throw new Error('Can only wrap code represented by string, not any other thing at the time! If you want to wrap a function, convert it to string first.')
    }
    // this is not a strong regex, but enough to use at the time
    return codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(loopHead) {
      var id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
      return `infiniteLoopDetector(${id});${loopHead}infiniteLoopDetector(${id});`
    })
  }
  infiniteLoopDetector.unwrap = function(codeStr) {
    return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, '')
  }

  return infiniteLoopDetector
}())


// Defaults in case a game doesn't load.
var code = "console.error('Nothing to run!!')";
let image_lookup = {};

let meta = {
  debug : true,
  external_cache : function(key, value) {
    // Post value to this addr.
    // "https://api.carolinaignites.org/cache/" + key + "/";
    // Should LRU save the value to the key
    // Interact with Service worker cache potentially.
  },
  cache_proxy : function(src, key) {
    // Obviously make this endpoint.
    // Should check cache, and if cache fails, it should then stream.
    let lookup = src.split("gf://")[1];
    if (lookup in image_lookup) {
      src = image_lookup[lookup];
    }
    return `${API_BASE}/cors/${src}`;
    // Uncomment this line if coors doesn't work.
    // return src
  },
};
(() => {
  require("@madisetti/web-sandbox/src/console.js");
  let query = window.location.search.split('?q=');
  let lookup = window.location.search.split('?l=');
  var data = {meta : meta}; // Init defaults
  let parse = function(hash) {
    let raw = window.atob(hash);
    let container = document.querySelector("#container");
    let old_data = data;
    data = JSON.parse(raw)
    meta = Object.assign({}, data["meta"], meta);
    code = window.atob(data["code"]) || code;
    image_lookup = JSON.parse(window.atob(data["images"]));
    container.innerHTML = window.atob(data["html"]);
  };
  if (lookup.length > 1) {
    $.ajax({
       url : `${API_BASE}/${lookup[1]}`,
       dataType : 'json',
       async : false,
       success : (data) => {
         if (data['valid'])
           parse(data['data']);
         else
           parse(query[1])
       }
     }).fail(() => parse(query[1]))
  } else if (query.length > 1) {
    parse(query[1]);
  }

  // Start if off!
  new GameFrame(meta, async function(gf) {
    let collision = gf.collision;
    let gameOver = gf.gameOver;
    let score = gf.score;
    let remove = gf.remove;
    let registerKeys = gf.registerKeys;
    let registerLoops = gf.registerLoops;
    let template = gf.template;
    let pause = function() {
      gf.pause();
      console.log("pausing game");
      return
    };
    let unpause = function() {
      gf.unpause();
      console.log("resuming game");
      return
    };
    console.evaluate = function(command) {
      let item = {command : command};
      try {
        item.result = eval(command);
      } catch (error) {
        item.result = error.toString();
        item._class = "error";
      }
      console.dispatchEvent("evaluate", item);
    };

    console.log("Testing for infinite loop");
    code = infiniteLoopDetector.wrap(code)
    try {
      eval(code);
    } catch (e) {
      if (e.type === 'InfiniteLoopError') {
        console.log('infinite loop detected')
      }

      var err = e.constructor(e.message);
      let trace = e.stack.split("\n")[1].split(":");
      err.lineNumber = trace[trace.length - 2];
      console.error(err);
      throw err;
    }
  });
})()
