import * as assert from 'power-assert';
import * as sinon from 'sinon';

import Togglable from './index';

describe('togglable',  () => {

  let togglable: Togglable;
  const div = document.createElement('div');
  beforeEach(() => {
    div.innerHTML = `
    <style>
      #test {
        transform: translateY(-100%);
      }
      #test .is-active {
        transform: translateY(0);
      }
    </style>
    <div id="test" style="-webkit-transition: all .5s linear; transition: all .5s linear;">test</div>
    `;
    document.body.appendChild(div);
  });

  afterEach(() => {
    togglable.destroy();
    document.body.innerHTML = '';
  });

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  it('show', () => {
    togglable = new Togglable(div);
    const onOpen = sinon.stub(togglable.option, 'onShow');
    togglable.show();
    assert(div.classList.contains('is-active'));

    delay(500)
      .then(() => {
        assert(onOpen.callCount === 1);
        togglable.show();
        return delay(500);
      })
      .then(() => {
        // すでに開いている時にopenを呼んでもonOpenは発火しない
        assert(onOpen.callCount === 1);
        onOpen.reset();
      });
  });

  it('hide', () => {
    togglable = new Togglable(div);
    const onShow = sinon.stub(togglable.option, 'onShow');
    const onHide = sinon.stub(togglable.option, 'onHide');
    togglable.show();
    togglable.hide();
    // 閉じる時はクラスの付け替えが即実行される
    assert(div.classList.contains('is-active') === false);
    assert(onHide.callCount === 1);

    delay(500)
      .then(() => {
        assert(onShow.callCount === 1);
        return delay(500);
      })
      .then(() => {
        // 閉じる時のtransitionendでは発火しない
        assert(onShow.callCount === 1);
        onShow.reset();
        onHide.reset();
      });
  });

  it('destroy', () => {
    togglable = new Togglable(div);
    const onShow = sinon.stub(togglable.option, 'onShow');
    const onHide = sinon.stub(togglable.option, 'onHide');
    togglable.show();

    delay(500)
      .then(() => {
        togglable.destroy();
        togglable.hide();
      })
      .then(() => {
        assert(onHide.callCount === 0);
        assert(div.classList.contains('is-active'));
        onShow.reset();
        onHide.reset();
      });
  });
});