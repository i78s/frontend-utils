import * as assert from 'power-assert';

import transitionEndName from './index';

describe("getTransitionEndName",  () => {

  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = '<div id="test" style="-webkit-transition: all .5s linear; transition: all .5s linear;">test</div>';
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('onTransitionEnd', () => {
    const $test = document.getElementById('test');
    $test.addEventListener(transitionEndName, () => {
      assert(true);
    });
    setTimeout(() => {
      $test.style.opacity = '0.5';
    });
  });
});