"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $body = document.body;
var $documentElement = document.documentElement;
function getScrollTop() {
    return $body.scrollTop || $documentElement.scrollTop;
}
var scrollTop = 0;
function fixScroll() {
    scrollTop = getScrollTop();
    $body.style.top = "-" + scrollTop + "px";
    $body.classList.add('js-no-scroll');
}
exports.fixScroll = fixScroll;
function releaseScroll(top) {
    $body.classList.remove('js-no-scroll');
    $body.style.top = '0';
    $body.scrollTop = $documentElement.scrollTop = top || scrollTop;
}
exports.releaseScroll = releaseScroll;
