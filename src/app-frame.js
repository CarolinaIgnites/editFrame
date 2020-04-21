require('./styles/main.css');

import('gameframe/src/js/interactive-custom.js');
import GameFrame from 'gameframe/src/js/gameframe.js';
import('gameframe/src/css/gameframe.css');
import('bootstrap/dist/css/bootstrap.css');
window.GameFrame = GameFrame.GameFrame;

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import('./scripts/frame.js');
