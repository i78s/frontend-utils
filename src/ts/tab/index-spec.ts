import * as assert from 'power-assert';
import * as sinon from 'sinon';

import Tab from './index';

describe('tab',  () => {

  let tab: Tab;
  let $tabs: NodeListOf<HTMLAnchorElement>;
  let $tabContents: NodeListOf<HTMLDivElement>;
  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = `
    <ul>
      <li><a class="js-tab" data-index="0" href="#">tab1</a></li>
      <li><a class="js-tab" data-index="1" href="#">tab2</a></li>
      <li><a class="js-tab" data-index="2" href="#">tab3</a></li>
    </ul>
    <div>
      <div class="js-tab-content">tab1 content</div>
      <div class="js-tab-content">tab2 content</div>
      <div class="js-tab-content">tab3 content</div>
    </div>
    `;
    document.body.appendChild(div);

    $tabs = <NodeListOf<HTMLAnchorElement>>document.querySelectorAll('.js-tab');
    $tabContents = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.js-tab-content');
  });

  afterEach(() => {
    tab.destroy();
    document.body.innerHTML = '';
  });

  describe('init',  () => {
    it('default', () => {
      tab = new Tab($tabs, $tabContents);
      Array.prototype.forEach.call($tabs, (el: HTMLAnchorElement, i: number) => {
        const bool = i === 0;
        assert(el.classList.contains('is-active') === bool);
        assert($tabContents[i].classList.contains('is-active') === bool);
      });

      const callback = sinon.stub(tab.option, 'onChange');
      $tabs[2].click();
      assert(callback.callCount === 1);
      assert(callback.calledWith($tabContents[2]));
      callback.reset();
    });

    it('set option', () => {
      const onChange = () => {};
      const option = {
        index: 1,
        activeClass: 'js-is-active',
        onChange: onChange
      };
      tab = new Tab($tabs, $tabContents, option);
      Array.prototype.forEach.call($tabs, (el: HTMLAnchorElement, i: number) => {
        const bool = i === 1;
        assert(el.classList.contains('js-is-active') === bool);
        assert($tabContents[i].classList.contains('js-is-active') === bool);
      });

      const callback = sinon.stub(tab.option, 'onChange').callsFake(onChange);
      $tabs[2].click();
      assert(callback.callCount === 1);
      assert(callback.calledWith($tabContents[2]));
      callback.reset();
    });
  });

  it('destroy',  () => {
    tab = new Tab($tabs, $tabContents);
    tab.destroy();

    const callback = sinon.stub(tab.option, 'onChange');
    $tabs[2].click();
    assert($tabs[0].classList.contains('is-active'));
    assert($tabContents[0].classList.contains('is-active'));
    assert(callback.callCount === 0);
    callback.reset();
  });
});
