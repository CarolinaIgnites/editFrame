(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{16:function(module,exports,__webpack_require__){var code="console.error('Nothing to run!!')";let image_lookup={},meta={debug:!0,external_cache:function(e,t){},cache_proxy:function(e,t){let o=e.split("gf://")[1];return o in image_lookup&&(e=image_lookup[o]),`https://api.carolinaignites.org/cors/${e}`}};(()=>{function sleep(e){return new Promise(t=>setTimeout(t,e))}__webpack_require__(26);let query=window.location.search.split("?q="),lookup=window.location.search.split("?l=");var data={meta:meta};let parse=function(e){let t=window.atob(e),o=document.querySelector("#container");data=JSON.parse(t),meta=Object.assign({},data.meta,meta),code=window.atob(data.code)||code,image_lookup=JSON.parse(window.atob(data.images)),o.innerHTML=window.atob(data.html)};lookup.length>1?$.ajax({url:`https://api.carolinaignites.org/${lookup[1]}`,dataType:"json",async:!1,success:e=>{e.valid?parse(e.data):parse(query[1])}}).fail(()=>parse(query[1])):query.length>1&&parse(query[1]),new GameFrame(meta,(async function(gf){let collision=gf.collision,gameOver=gf.gameOver,score=gf.score,remove=gf.remove,registerKeys=gf.registerKeys,registerLoops=gf.registerLoops,template=gf.template,pause=function(){gf.pause(),console.log("pausing game")},unpause=function(){gf.unpause(),console.log("resuming game")};console.evaluate=function(command){let item={command:command};try{item.result=eval(command)}catch(e){item.result=e.toString(),item._class="error"}console.dispatchEvent("evaluate",item)};try{eval(code)}catch(e){var err=e.constructor(e.message);let t=e.stack.split("\n")[1].split(":");throw err.lineNumber=t[t.length-2],console.error(err),err}}))})()},26:function(module,exports){frame=console;let C={__on:{},addEventListener:function(e,t){return this.__on[e]=(this.__on[e]||[]).concat(t),this},dispatchEvent:function(e,t){this.__on[e]=this.__on[e]||[];for(var o=0,a=this.__on[e].length;o<a;o++)this.__on[e][o].call(this,t),frame.log(t);return this},log:function(){let e=[];for(let t=0,o=arguments.length;t<o;t++){let o=(new Error).stack.split("\n")[2].split(":"),a=0|o[o.length-2];e.push({command:"(line "+a+")",result:arguments[t]})}this.dispatchEvent("log",e)},error:function(){let e=[];for(let t=0,o=arguments.length;t<o;t++){let o=arguments[t].message,a=(new Error).stack.split("\n")[2].split(":"),n=0|a[a.length-2];arguments[t].stack&&(n=arguments[t].stack.replace(/\([^:]*:[^:]*:/g,"(line ")),n=n.split(" ").slice(1).join(" ").replace(/\n$/,""),e.push({command:n,result:o,_class:"error"})}this.dispatchEvent("error",e)},evaluate:function(command){let item={command:command};try{item.result=eval(command)}catch(e){item.result=e.toString(),item._class="error"}this.dispatchEvent("evaluate",item)}};C.debug=C.info=C.log,window.console=C}}]);