"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IE10以上, Android4.4.2以上
function getTransitionEndName() {
    var el = document.createElement('div');
    var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };
    for (var key in transitions) {
        if (transitions.hasOwnProperty(key) && typeof el.style[key] !== 'undefined') {
            return transitions[key];
        }
    }
}
exports.getTransitionEndName = getTransitionEndName;
var transitionEndName = getTransitionEndName();
exports.default = transitionEndName;
