require('gameframe/src/css/gameframe.css');
require('bootstrap/dist/css/bootstrap.css');

import('gameframe/src/js/interactive-custom.js');
import GameFrame from 'gameframe/src/js/gameframe.js';
window.GameFrame = GameFrame.GameFrame;

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import('./scripts/frame.js');
