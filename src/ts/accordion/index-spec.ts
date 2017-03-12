import * as assert from 'power-assert';

import Accordion from './index';

describe('accordion',  () => {

  const arr = [0, 1, 2];
  const getListHTML = (index: number) => {
    return `<li>
          <a data-index="${index}" class="js-accordion-trigger">
            Collapsible Group Item #${index}
          </a>
          <div class="js-accordion-collapse">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ante diam. Donec posuere augue ut imperdiet tincidunt. Nullam turpis eros, tempus et vehicula at, dictum id sem. Integer facilisis augue nec dolor maximus molestie. Mauris at justo lorem. Nullam molestie nisl ac ipsum posuere, a egestas ipsum ornare. Sed nisi erat, imperdiet at iaculis a, hendrerit vitae velit. Suspendisse massa arcu, pharetra et aliquet et, maximus mattis tortor.
          </div>
        </li>`;
  };

  let accordion: Accordion;
  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = `
    <style>
      .js-accordion-collapse {
        height: 0;
        width: 100%;
        overflow: hidden;
      }
    </style>
    <div id="js-accordion">
      <ul>
        ${arr.map(i => getListHTML(i))}
      </ul>
    </div>`;
    document.body.appendChild(div);
  });

  afterEach(() => {
    accordion.destroy();
    document.body.innerHTML = '';
  });

  it('init', () => {
    const $jsAccordion = document.getElementById('js-accordion');
    const $triggers = <NodeListOf<HTMLAnchorElement>>document.querySelectorAll('.js-accordion-trigger');
    const $collapses = <NodeListOf<HTMLElement>>document.querySelectorAll('.js-accordion-collapse');

    accordion = new Accordion($jsAccordion);

    let index = 0;
    $triggers[index].click();
    Array.prototype.forEach.call($collapses, (el: HTMLElement, i: number) => {
      let bool = index === i;
      let height = bool ? `${el.scrollHeight}px` : '';
      assert($triggers[i].classList.contains('is-active') === bool);
      assert(el.style.height === height);
    });

    $triggers[index].click();
    Array.prototype.forEach.call($collapses, (el: HTMLElement, i: number) => {
      assert($triggers[i].classList.contains('is-active') === false);
      assert(el.style.height === '' || el.style.height === '0px');
    });

    $triggers[1].click();
    $triggers[2].click();
    Array.prototype.forEach.call($collapses, (el: HTMLElement, i: number) => {
      let bool = index !== i;
      let height = bool ? `${el.scrollHeight}px` : '0px';
      assert($triggers[i].classList.contains('is-active') === bool);
      assert(el.style.height === height);
    });
  });

  it('destroy', () => {
    const $jsAccordion = document.getElementById('js-accordion');
    const $triggers = <NodeListOf<HTMLAnchorElement>>document.querySelectorAll('.js-accordion-trigger');
    const $collapses = <NodeListOf<HTMLElement>>document.querySelectorAll('.js-accordion-collapse');

    accordion = new Accordion($jsAccordion);
    let index = 0;
    $triggers[index].click();

    accordion.destroy();
    $triggers[index].click();
    assert($collapses[index].style.height !== '0px');
  });
});
