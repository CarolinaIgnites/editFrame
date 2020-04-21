import('codemirror/lib/codemirror.css');
import('codemirror/theme/solarized.css');
import('jquery.terminal/css/jquery.terminal.css');
import('bootstrap/dist/css/bootstrap.css');
import('./styles/main.css');

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery.terminal';

import('bootstrap/js/modal.js');
import('bootstrap/js/tab.js');

import CodeMirror from 'codemirror/lib/codemirror.js';
import('codemirror/mode/javascript/javascript.js');
import('codemirror/mode/htmlmixed/htmlmixed.js')
import('codemirror/mode/xml/xml.js');
window.CodeMirror = CodeMirror;

import('gameframe/src/js/manifest.json');

let QRCode = import('davidshimjs-qrcodejs/qrcode.js');
window.QRCodePromise = QRCode;

import {js_beautify, html_beautify} from 'js-beautify';
window.js_beautify = js_beautify;
window.html_beautify = html_beautify;

import Split from 'split.js'
window.Split = Split;

require('./scripts/editFrame.js');
