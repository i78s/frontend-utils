import * as assert from 'power-assert';

import { fixScroll, releaseScroll } from './index';

describe("no-scroll",  () => {

  const $body = document.body;
  const $scroll = 'scrollingElement' in document ? document.scrollingElement : document.body;
  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = '<div style="height: 9999px;">test</div>';
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('fixScroll', () => {
    $scroll.scrollTop = 200;
    fixScroll();

    assert($scroll.scrollTop === 0);
    assert($body.style.top === '-200px');
    assert($body.style.position === 'fixed');
    assert($body.style.width === '100%');
  });

  it('releaseScroll', () => {
    releaseScroll();

    assert($scroll.scrollTop === 200);
    assert($body.style.top === '0px');
    assert($body.style.position === '');
    assert($body.style.width === '');
  });
});
