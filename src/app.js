require ('codemirror/lib/codemirror.css');
require ('codemirror/theme/solarized.css');
require('jquery.terminal/css/jquery.terminal.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./styles/main.css');



import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery.terminal';

require('bootstrap');


import CodeMirror from 'codemirror/lib/codemirror.js';
window.CodeMirror = CodeMirror;

require ('codemirror/mode/javascript/javascript.js');
require ('codemirror/mode/htmlmixed/htmlmixed.js')
require ('codemirror/mode/xml/xml.js');


// import QRCode from 'davidshimjs-qrcodejs/qrcode.min.js';
// window.QRCode = QRCode;
 require('davidshimjs-qrcodejs/qrcode.min.js');

require('./scripts/editFrame.js');

require('./scripts/formatting.js');



