var CodeMirror = window.CodeMirror;
// TODO: Break these up into their logical components. E.g. import for
// fullscreen, import for images, import for codemirror, import for frame
// communication, import for console, import for responsiveness.
// Run before page load
(() => {
  let htmlCode = $("#HTMLtext")[0];
  let htmlEditor;
  let jsCode = $("#codeText")[0];
  let jsEditor;
  let terminal = null;
  let images = {};
  let updateImageTable = function(image) {
    let url = `${API_BASE}/cors/${image["url"]}`;
    let imgListItem = new DOMParser().parseFromString(
        `
      <div id="${image["name"]}div" class='list-group-item col-sm-6'>
        <img src=${url} width=125 height=125 />
        <button type="button" id="${
            image["name"]}" class="close img-close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5>${image["name"]}</h5>
      </div>`,
        "text/html");

    image["dom"] = imgListItem.body.firstChild;
    document.getElementById("imageHolder").appendChild(image["dom"]);
  };
  let bind_editors = function() {
    htmlEditor = CodeMirror.fromTextArea(htmlCode, {
      mode : "htmlmixed",
      lineNumbers : true,
      lineWrapping : true,
      theme : "solarized dark",
    })
    jsEditor = CodeMirror.fromTextArea(jsCode, {
      mode : "javascript",
      lineNumbers : true,
      lineWrapping : true,
      theme : "solarized dark",
      viewportMargin : Infinity
    });
  };
  let remove_splash = function() {
    $("#splash").remove();
    $("body").attr("style", "");
  };
  let hashImages = function() {
    let bare_images = {};
    for (image in images) {
      bare_images[image] = images[image]["url"];
    }
    return bare_images;
  };
  let constructImages = function(imgs) {
    for (name in imgs) {
      images[name] = {"name" : name, "url" : imgs[name], "dom" : null};
      updateImageTable(images[name]);
    }
  };
  let hash = location.hash.split("#");
  let parse = function(data) {
    let raw = atob(data);
    let source = JSON.parse(raw);
    $("#title").val(source["meta"]["name"]);
    $("#instructions").val(source["meta"]["instructions"]);
    $("#boundaries")[0].checked = source["meta"]["boundaries"];
    $("#gravity")[0].checked = source["meta"]["gravity"];
    $("#impulse")[0].checked = source["meta"]["impulse"];
    constructImages(JSON.parse(atob(source["images"] || btoa("{}"))));
    let setup_editors = function() {
      bind_editors();
      htmlEditor.setValue(atob(source["html"]));
      jsEditor.setValue(atob(source["code"]));
      $("#update").click();
      remove_splash();
    };
    $(document).ready(setup_editors);
  };
  let frame = $("#frame");
  let iframe = frame[0];

  // Capture transition point.
  let resize = function() {
    frame.height(frame.width() * 768 / 1366);
    if (terminal) {
      $(terminal).css('height', `calc(100vh - ${frame.height() + 225}px)`);
    }
  };

  window.addEventListener('resize', resize, true);
  $(document).ready(function() {
    // Allows for resizing the code section vs. the game section.
    let get_left = function(index, gutterSize) {
      const W = $(window).width();
      if (W < 902)
        return "calc(" + (100 / 3) + "% - 19px)";
      return "calc(" +
             100 * $(".split-col")[index].getBoundingClientRect().width / W +
             "% + 1px)";
    };
    var s = Split([ '#code-col', '#game-col' ], {
      elementStyle : function(dimension, size, gutterSize, index) {
        if (index == 0) {
          resize();
        }
        return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
      },
      onDragEnd : function() {
        let left = get_left(0, 30);
        $($('.gutter')[0]).css("left", left)
      },
      gutterStyle : function(dimension, gutterSize) {
        let left = get_left(0, gutterSize);
        return { 'width': gutterSize + 'px', 'left': left, }
      },
      sizes : [ 100 / 3., 200 / 3. ],
      minSize : [ 375, 600 ],
      gutterSize : 30,
      cursor : 'col-resize'
    });
    resize();
  }, true);

  // Register events
  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    if (($(e.target).attr("href")) == "#console") {
      document.getElementById("fullscreen").disabled = true;
    } else if (($(e.target).attr("href")) == "#game") {
      document.getElementById("fullscreen").disabled = false;
      resize();
    }
    htmlEditor.refresh();
    jsEditor.refresh();
  });

  let motivation = [
    "Errors can be scary but they don't have to be :)",
    "Knowing something's wrong the first step to fixing it.",
    "You got this!",
    "I'm sure you meant to do this ;).",
  ];

  iframe.onload = () => {
    if (!iframe.contentWindow.console.addEventListener) {
      console.log("Your browser will not support logging.");
      return;
    }

    if (!window._sandbox) {
      // Create the sandbox:
      window._sandbox = new Sandbox.View({
        el : $('#sandbox'),
        iframe:iframe,
        model : new Sandbox.Model({
        iframe:iframe,
        })
      });
      terminal = $("pre.output")[0];
      resize();
    } else {
      window._sandbox.model.iframeSetup(iframe);
    }
  };

  let format = function(editor, formatter) {
    CodeMirror.commands["selectAll"](editor);
    let from = editor.getCursor(true);
    let to = editor.getCursor(false);
    let text = editor.getRange(from, to);
    editor.setValue(formatter(text));
  }

  $("#cleancodeHTML").click(()=>format(htmlEditor, html_beautify));
  $("#cleancodeJS").click(()=>format(jsEditor, js_beautify));

  $("#fullscreen").click(function() {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled || document.msFullscreenEnabled) {

      // Do fullscreen
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

  let qrcode;
  QRCodePromise.then((QRresult) => qrcode = new QRresult.default("qrcode"));
  $("#QR").click(function() {
    let code = location.hash.split("#")[1];
    let api_url = `${API_BASE}/app/${code}`;
    qrcode.makeCode(api_url);
  });

  $("#update").click(() => {
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
    $.post(API_BASE, {data : hash, hash : location.hash}, (lookup) => {
       location.hash = lookup['lookup'];
       iframe.src = "frame.html?l=" + lookup['lookup'];
     }).fail(function() {
      location.hash = hash;
      iframe.src = "frame.html?q=" + hash;
    });
  });

  $("#new-name").click(() => {
    location.hash = "";
    $("update").trigger("click");
  })

  $("#add").click(() => {
    var name = $("#imageName").val();
    var url = $("#imageAddress").val();

    if (name == "" || url == "")
      return

          if (name in images) {
        let dom = images[name]["dom"];
        dom.querySelector("img").src = `${API_BASE}/cors/${url}`;
        images[name]["url"] = url;
        return;
      }
    images[name] = {"name" : name, "url" : url, "dom" : null};

    $("#imageName").val("");
    $("#imageAddress").val("");

    updateImageTable(images[name]);
  });

  $(document).on('click', '.img-close', function() {
    var deleteImage = confirm("Are you sure you want to delete this image?");
    if (deleteImage) {
      var name = this.id; // image name binded to button
      delete images[name];
      document.getElementById(name + "div").remove();
    }
    return;
  });

  // Load in data
  if (hash.length > 1) {
    $.ajax({
       url : `${API_BASE}/${hash[1]}`,
       dataType : 'json',
       success : (data) => {
         if (data['valid'])
           parse(data['data']);
         else
           parse(hash[1])
       }
     }).fail(() => parse(hash[1]))
  } else {
    $(document).ready(() => {
      bind_editors();
      remove_splash();
    });
  }
})();
