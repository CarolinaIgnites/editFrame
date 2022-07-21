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
    try {
      console.log("yoyoy");
      code = infiniteLoopDetector.wrap(code)
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
