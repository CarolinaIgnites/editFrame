var code = "console.error('Nothing to run!!')";
let image_lookup = {};
console.log("frame.js");
console.log(window);
let meta = {
    debug: true,
    external_cache: function(key, value) {
        // Post value to this addr.
        // "https://api.carolinaignites.org/cache/" + key + "/";
        // Should LRU save the value to the key
        // Interact with Service worker cache potentially.
    },
    cache_proxy: function(src, key) {
        // Obviously make this endpoint.
        // Should check cache, and if cache fails, it should then stream.
        let lookup = src.split("gf://")[1];
        if (lookup in image_lookup) {
            src = image_lookup[lookup];
        }
        return "https://api.carolinaignites.org/cors/" + src;
        // Uncomment this line if coors doesn't work.
        // return src
    },
};
(() => {
    // Stolen from Stackoverflow: https: //stackoverflow.com/questions/14924362/
    let C = {
        __on: {},
        addEventListener: function(name, callback) {
            this.__on[name] = (this.__on[name] || []).concat(callback);
            return this;
        },
        dispatchEvent: function(name, value) {
            this.__on[name] = (this.__on[name] || []);
            for (var i = 0, n = this.__on[name].length; i < n; i++) {
                this.__on[name][i].call(this, value);
            }
            return this;
        },
        log: function() {
            let a = []; // For V8 optimization
            for (let i = 0, n = arguments.length; i < n; i++) {
                // What a hack
                let trace = (new Error).stack.split("\n")[2].split(":");
                let line = (trace[trace.length - 2] | 0);
                a.push(arguments[i].toString() + " (line " + line + ")");
            }
            this.dispatchEvent("log", a.join("\n"));
        },
        error: function() {
            let a = []; // For V8 optimization
            for (let i = 0,
                    n = arguments.length; i < n - 2; i++) {
                let message = arguments[i].message;
                message += arguments[i].stack.replace(/\([^:]*:[^:]*:/g, "(line ");
                a.push(message);
            }
            this.dispatchEvent("error", a);
        }
    };
    C.debug = C.info = C.log;
    window.console = C; // Handle gracefuly if things break.
    let query = window.location.search.split('?q=');
    let lookup = window.location.search.split('?l=');
    var data = {
        meta: meta
    }; // Init defaults
    let parse = function(hash) {
        let raw = window.atob(hash);
        let container = document.querySelector("#container");
        let old_data = data;
        data = JSON.parse(raw)
        meta = Object.assign({}, data["meta"], meta);
        code = window.atob(data["code"]);
        image_lookup = JSON.parse(window.atob(data["images"]));
        container.innerHTML = window.atob(
            data["html"]);
    }
    if (lookup.length > 1) {
        $.ajax({
            url: "https://api.carolinaignites.org/" + lookup[1],
            dataType: 'json',
            async: false,
            success: (data) => {
                if (data['valid']) parse(data['data']);
                else parse(query[1])
            }
        }).fail(() => parse(query[1]))
    } else if (query.length > 1) {
        parse(query[1]);
    }    // Start if off!
    
    new GameFrame.GameFrame(meta,
        function(gf) {
            let collision = gf.collision;
            let gameOver = gf.gameOver;
            let score = gf.score;
            let remove = gf.remove;
            let registerKeys = gf.registerKeys;
            let registerLoops = gf.registerLoops;
            let template = gf.template;
            try {
                eval(code);
            } catch (e) {
                console.log("yoyoyo");
                var err = e.constructor(e.message);
                let trace = e.stack.split("\n")[1].split(":");
                err.lineNumber = trace[trace.length - 2];
                console.error(err);
                throw err;
            }
        }); 
})() 