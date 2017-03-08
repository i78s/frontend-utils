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
    $body.style.position = 'fixed';
    $body.style.width = '100%';
}
exports.fixScroll = fixScroll;
function releaseScroll(top) {
    $body.style.top = '0px';
    $body.style.position = '';
    $body.style.width = '';
    $body.scrollTop = $documentElement.scrollTop = top || scrollTop;
}
exports.releaseScroll = releaseScroll;
