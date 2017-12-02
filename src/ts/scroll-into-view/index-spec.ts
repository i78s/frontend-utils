import * as assert from 'power-assert';

import ScrollIntoView from './index';

describe('scroll-into-view',  () => {
  let scrollIntoView: ScrollIntoView;
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
      .box {
        height: 300px;
        width: 300px;
        margin-bottom: 300px;
      }
    </style>
    <div>
      <div class="box js-slidein"></div>
      <div class="box js-slidein"></div>
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
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  function getClassNameList() {
    return Array.prototype.map.call(document.body.getElementsByClassName(className), (el: HTMLDivElement) => {
      return el.className;
    });
  }

  function triggerScroll(top = 0) {
    const e = document.createEvent('HTMLEvents');
    $scroll.scrollTop = top;
    e.initEvent('scroll', true, true);
    $scroll.dispatchEvent(e);
  }

  describe('init', () => {

    beforeEach(() => {
      scrollIntoView = new ScrollIntoView(className);
    });

    afterEach(() => {
      scrollIntoView.destroy();
    });

    it('offset zero', () => {
      const innerHeight = window.innerHeight; // 600
      scrollIntoView.init();

      let list = getClassNameList();
      let result = list.filter((el: any) => el.includes('is-show'));
      assert(result.length === 1);

      for (let i = 1, len = list.length; i < len; i++) {

        for (let j = 0; j < 2; j++) {
          const isReached = j % 2 !== 0;
          const scrollTop = isReached ? innerHeight * i + 1 : innerHeight * i;
          // ループの最後はmodifierを付ける要素がないのでカウントが増えない
          const isPassed = isReached && i !== len -1 ? i + 2 : i + 1;

          triggerScroll(scrollTop);
          list = getClassNameList();
          result = list.filter((el: any) => el.includes('is-show'));
          assert(result.length === isPassed);
        }
      }
    });

    it('negative offset', () => {
      const innerHeight = window.innerHeight; // 600
      scrollIntoView.init(-50);

      let list = getClassNameList();
      let result = list.filter((el: any) => el.includes('is-show'));
      assert(result.length === 2);

      triggerScroll(innerHeight);
      list = getClassNameList();
      result = list.filter((el: any) => el.includes('is-show'));
      assert(result.length === 2);
    });


  });

  describe('destroy', () => {
    it('remove Event', () => {
      const innerHeight = window.innerHeight; // 600
      scrollIntoView = new ScrollIntoView(className);
      scrollIntoView.init();
      scrollIntoView.destroy();

      triggerScroll(innerHeight * 2);

      let list = getClassNameList();
      let result = list.filter((el: any) => el.includes('is-show'));
      assert(result.length === 1);
    });
  });


  describe('constructor option', () => {

    afterEach(() => {
      scrollIntoView.destroy();
    });

    it('switchClass', () => {
      scrollIntoView = new ScrollIntoView(className, {
        switchClass: 'is-active'
      });
      scrollIntoView.init();

      let list = getClassNameList();
      let result = list.filter((el: any) => el.includes('is-active'));
      assert(result.length === 1);
      assert(list.filter((el: any) => el.includes('is-show')).length === 0);
    });

    it('offset', () => {
      scrollIntoView = new ScrollIntoView(className, {
        offset: -50
      });

      scrollIntoView.init();

      let list = getClassNameList();
      let result = list.filter((el: any) => el.includes('is-show'));
      assert(result.length === 2);
    });
  });
});