import * as assert from 'power-assert';

import { rafInterval, rafClearInterval } from '../raf-interval';
import StaggeredListTransition from './index';

describe('staggered-list-transition',  () => {

  let staggeredListTransition: StaggeredListTransition;
  const className = 'js-slidein';
  const $scroll = 'scrollingElement' in document ? document.scrollingElement : document.body;

    beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = `
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .row:after {
        content: " ";
        display: block;
        clear: both;
      }
      .row > * {
        float: left;
      }
      .col-4 {
        width: 33.33%;
      }
      .box {
        height: 300px;
        width: 100%;
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
    <div class="row">
      <div class="col-4 js-slidein"><div class="box"></div></div>
      <div class="col-4 js-slidein"><div class="box"></div></div>
      <div class="col-4 js-slidein"><div class="box"></div></div>
      
      <div class="col-4 js-slidein"><div class="box"></div></div>
      <div class="col-4 js-slidein"><div class="box"></div></div>
      <div class="col-4 js-slidein"><div class="box"></div></div>
      
      <div class="col-4 js-slidein"><div class="box"></div></div>
      <div class="col-4 js-slidein"><div class="box"></div></div>
    </div>`;
    document.body.appendChild(div);
    $scroll.scrollTop = 0;
    staggeredListTransition = new StaggeredListTransition(className);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

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

    let total = getClassNameList().length;
    let index = 0;
    let timer = rafInterval(() => {
      let list = getClassNameList();
      let show = list.filter((el: any) => el.includes('is-show'));
      let hide = list.filter((el: any) => el.includes('is-hide'));
      let out = list.filter((el: any) => el.includes('is-out'));
      assert(show.length === index + 1);
      assert(hide.length === 0);
      assert(out.length === 0);

      if (index === total - 1 ) {
        rafClearInterval(timer);
      }
      index++;
    }, staggeredListTransition.option.delay);

  });

  describe('hide', () => {

    beforeEach(() => {
      Array.prototype.forEach.call(document.querySelectorAll(`.${className}`), (el: HTMLDivElement) => {
        el.classList.add(staggeredListTransition.option.showClass);
      });
    });

    it('画面外の要素がアニメーションの対象から除外されること', (done) => {
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
        });

      let total = getClassNameList().length;
      let outCount = 2;  // window.innerHeightが600の前提
      let hideCount = total - outCount;
      let index = 0;
      let timer = rafInterval(() => {
        let list = getClassNameList();
        let show = list.filter((el: any) => el.includes('is-show'));
        let hide = list.filter((el: any) => el.includes('is-hide'));
        let out = list.filter((el: any) => el.includes('is-out'));
        assert(show.length === total);
        assert(hide.length === hideCount <= index ? hideCount : index + 1);
        assert(out.length === outCount);

        if (index === total - 1 ) {
          rafClearInterval(timer);
        }
        index++;
      }, staggeredListTransition.option.delay);
    });

    it('画面内の要素がアニメーションの対象になること', (done) => {
      $scroll.scrollTop = 1;

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
        });

      let total = getClassNameList().length;
      let outCount = 0;  // window.innerHeightが600の前提
      let hideCount = total - outCount;
      let index = 0;
      let timer = rafInterval(() => {
        let list = getClassNameList();
        let show = list.filter((el: any) => el.includes('is-show'));
        let hide = list.filter((el: any) => el.includes('is-hide'));
        let out = list.filter((el: any) => el.includes('is-out'));
        assert(show.length === total);
        assert(hide.length === hideCount <= index ? hideCount : index + 1);
        assert(out.length === outCount);

        if (index === total - 1 ) {
          rafClearInterval(timer);
        }
        index++;
      }, staggeredListTransition.option.delay);
    });
  });

});