const $body = document.body;
const $documentElement = document.documentElement;

function getScrollTop() {
  return $body.scrollTop || $documentElement.scrollTop;
}

let scrollTop = 0;
export function fixScroll() {
  scrollTop = getScrollTop();
  $body.style.top = `-${scrollTop}px`;
  $body.style.position = 'fixed';
  $body.style.width = '100%';
}

export function releaseScroll(top?: number) {
  $body.style.top = '0px';
  $body.style.position = '';
  $body.style.width = '';
  $body.scrollTop = $documentElement.scrollTop = top || scrollTop;
}