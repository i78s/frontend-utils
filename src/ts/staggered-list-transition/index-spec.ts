import * as assert from 'power-assert';

import StaggeredListTransition from './index';

describe('staggered-list-transition',  () => {

  let staggeredListTransition: StaggeredListTransition;
  const className = 'js-slidein';
  const $scroll = navigator.userAgent.indexOf('WebKit') < 0 ? document.documentElement : document.body;

  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = `
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box {
        height: 300px;
        width: 300px;
        margin-bottom: 300px;
      }
      .js-slidein {
        transform: translateY(40px);
        opacity: 0;
        transition: .3s ease-out;
      }
      .js-slidein.is-show {
        opacity: 1;
        transform: translateY(0px);
      }
      .js-slidein.is-hide {
        opacity: 0;
        transform: translateY(100px);
      }
      .js-slidein.is-out {
        opacity: 0;
      }
    </style>
    <div id="wrapper">
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
    </div>`;
    document.body.appendChild(div);
    $scroll.scrollTop = 0;
    staggeredListTransition = new StaggeredListTransition(className);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  function triggerScroll(top = 0) {
    const e = document.createEvent('HTMLEvents');
    $scroll.scrollTop = top;
    e.initEvent('scroll', true, true);
    $scroll.dispatchEvent(e);
  }

  function getClassNameList() {
    return Array.prototype.map.call(document.body.getElementsByClassName(className), (el: HTMLDivElement) => {
      return el.className;
    });
  }

  it('show', (done) => {
    staggeredListTransition.show()
      .then(() => {
        let list = getClassNameList();
        let show = list.filter((el: any) => el.includes('is-show'));
        let hide = list.filter((el: any) => el.includes('is-hide'));
        let out = list.filter((el: any) => el.includes('is-out'));
        assert(list.length === show.length);
        assert(hide.length === 0);
        assert(out.length === 0);
        done();
      });
  });

  describe('hide', () => {
    it('scrollTop: 0', (done) => {
      staggeredListTransition.hide()
        .then(() => {
          let list = getClassNameList();
          let show = list.filter((el: any) => el.includes('is-show'));
          let hide = list.filter((el: any) => el.includes('is-hide'));
          let out = list.filter((el: any) => el.includes('is-out'));
          assert(show.length === 0);
          assert(hide.length === 0);
          assert(out.length === 0);
          done();
        })
    });
  });

});