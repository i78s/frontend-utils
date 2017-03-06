const $body = document.body;
const $documentElement = document.documentElement;

function getScrollTop() {
  return $body.scrollTop || $documentElement.scrollTop;
}

let scrollTop = 0;
export function fixScroll() {
  scrollTop = getScrollTop();
  $body.style.top = `-${scrollTop}px`;
  $body.classList.add('js-no-scroll');
}

export function releaseScroll(top: number) {
  $body.classList.remove('js-no-scroll');
  $body.style.top = '0';
  $body.scrollTop = $documentElement.scrollTop = top || scrollTop;
}