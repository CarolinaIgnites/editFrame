// Run before page load
(() => {
    var htmlCode = $("#HTMLtext")[0];
    var htmlEditor = CodeMirror.fromTextArea(htmlCode, {
        mode: "htmlmixed",
        lineNumbers: true,
        lineWrapping: true,
        theme: "solarized dark",
    })
    var jsCode = $("#codeText")[0];
    var jsEditor = CodeMirror.fromTextArea(jsCode, {
        mode: "javascript",
        lineNumbers: true,
        lineWrapping: true,
        theme: "solarized dark",
        viewportMargin: Infinity
    });
    let images = {};
    let updateImageTable = function(image) {
      // TODO set url correctly.
      let img = new DOMParser().parseFromString(`
      <div class='list-group-item col-sm-6'>
        <img src=` + image["url"] + ` width=125 height=125 />
        <h5>` + image["name"] + `</h5>
      </div>`, "text/html");

      image["dom"] = img.body.firstChild;
      document.getElementById("imageHolder").appendChild(image["dom"])
    }
    let hashImages = function(){
      let bare_images = {};
      for (image in images) {
        bare_images[image] = images[image]["url"];
      }
      return bare_images;
    }
    let constructImages = function(imgs){
      console.log(imgs)
      for (name in imgs) {
        images[name] = {"name": name, "url": imgs[name], "dom": null};
        updateImageTable(images[name]);
      }
    }
    let hash = location.hash.split("#");
    let parse = function(data) {
        let raw = atob(data);
        let source = JSON.parse(raw);
        console.log(source)
        $("#title").val(source["meta"]["name"]);
        $("#instructions").val(source["meta"]["instructions"]);
        htmlEditor.setValue(atob(source["html"]));
        jsEditor.setValue(atob(source["code"]));
        $("#boundaries")[0].checked = source["meta"]["boundaries"];
        $("#gravity")[0].checked = source["meta"]["gravity"];
        $("#impulse")[0].checked = source["meta"]["impulse"];
        constructImages(JSON.parse(atob(source["images"] || "")));
        $("#update").click();
    }
    let frame = $("#frame");
    let iframe = frame[0];
    let resize = function() {
        frame.height(frame.width() * 768 / 1366);
    }
    window.addEventListener('resize', resize, true);
    resize();

    // Register events
    $('.list-group').css({ 'max-height': frame.height() - 100 + 'px' });

    $('a[data-toggle="tab"]')
        .on('shown.bs.tab', function(e) {
            if (($(e.target).attr("href")) == "#console") {
                document.getElementById("fullscreen").disabled = true;
            } else if (($(e.target).attr("href")) == "#game") {
                document.getElementById("fullscreen").disabled = false;
            }
            htmlEditor.refresh();
            jsEditor.refresh();
        });
    $('.CodeMirror-scroll').css({ 'max-height': frame.height() + 80 + 'px' });

    iframe.onload = () => {
        iframe.contentWindow.console.addEventListener(
            "log",
            function(value) {
                console.log(value);
            });
        iframe.contentWindow.console.addEventListener(
            "error",
            function(value) {
                console.error(value);
            });
    };

    $("#cleancodeHTML")
        .click(function() {
            CodeMirror.commands["selectAll"](htmlEditor);
            var range = { from: htmlEditor.getCursor(true), to: htmlEditor.getCursor(false) };
            htmlEditor.autoFormatRange(range.from, range.to);
        })
    $("#cleancodeJS")
        .click(function() {
            CodeMirror.commands["selectAll"](jsEditor);
            var range = { from: jsEditor.getCursor(true), to: jsEditor.getCursor(false) };
            jsEditor.autoFormatRange(range.from, range.to);
        })

    $("#fullscreen")
        .click(function() {
            if (document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled) {

                // which element will be fullscreen
                var iframe = $("#frame")[0];
                // Do fullscreen
                //alert("yeet1")
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            } else {
                alert("fullscreen not supported on your browser")
            }
        })

    $("#update")
        .click(() => {
            var data = new Object();
            var meta = new Object();
            meta.name = new Option($("#title").val()).innerHTML;
            meta.instructions = new Option($("#instructions").val()).innerHTML;
            meta.boundaries = $("#boundaries").prop("checked");
            meta.gravity = $("#gravity").prop("checked");
            meta.impulse = $("#impulse").prop("checked");
            meta.debug = true;
            data.meta = meta;
            data.html = btoa(htmlEditor.getValue());
            data.code = btoa(jsEditor.getValue());
            data.images = btoa(JSON.stringify(hashImages()));
            let hash = btoa(JSON.stringify(data));
            $.post("https://api.carolinaignites.org", {
                data: hash
            }, (lookup) => {
                location.hash = lookup['lookup'];
                iframe.src = "frame.html?l=" + lookup['lookup'];
            }).fail(function() {
                location.hash = hash;
                iframe.src = "frame.html?q=" + hash;
            });
        });

    $("#add").click(() => {
        var name = $("#imageName").val();
        var url = $("#imageAddress").val();

        if (name == "" || url == "") return

        if (name in images) {
          let dom = images[name]["dom"];
          dom.querySelector("img").src = url;
          return;
        }

        images[name] = {"name": name, "url": url, "dom":null};

        $("#imageName").val("");
        $("#imageAddress").val("");

        updateImageTable(images[name]);
    });

    // Load in data
    if (hash.length > 1) {
        $.ajax({
            url: "https://api.carolinaignites.org/" + hash[1],
            dataType: 'json',
            success: (data) => {
                if (data['valid']) parse(data['data']);
                else parse(hash[1])
            }
        }).fail(() => parse(hash[1]))
    }
})();

// Run jQuery Plugin
jQuery(function($, undefined) {
    var term = $('#console')
        .terminal(
            function(command) {
                if (command !== '') {
                    try {
                        var result = window.eval(command);
                        if (result !== undefined) {
                            this.echo(new String(result));
                        }
                    } catch (e) {
                        this.error(new String(e));
                    }
                } else {
                    this.echo('');
                }
            }, {
                greetings: 'Welcome to the terminal!',
                name: 'js_demo',
                height: 200,
                prompt: '> '
            });
    console.log = (v) => {
        term.echo(JSON.stringify(v));
    };
    console.error = (v) => {
        term.error(JSON.stringify(v));
    };
});
