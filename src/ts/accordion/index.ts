
interface AccordionOption {
  triggerSelector: string;
  collapseSelector: string;
  activeClass: string;
}

export default class Accordion {

  private element: HTMLElement;
  private triggers: NodeListOf<HTMLAnchorElement>;
  private collapses: NodeListOf<HTMLElement>;
  option: AccordionOption;

  private onClickHandler: (e: Event) => void;

  constructor(element: HTMLElement, option?: AccordionOption) {

    this.option = Object.assign({
      triggerSelector: '.js-accordion-trigger',
      collapseSelector: '.js-accordion-collapse',
      activeClass: 'is-active'
    }, option);

    this.element = element;
    this.triggers = <NodeListOf<HTMLAnchorElement>>this.element.querySelectorAll(this.option.triggerSelector);
    this.collapses = <NodeListOf<HTMLElement>>this.element.querySelectorAll(this.option.collapseSelector);

    this.onClickHandler = (e: Event) => {
      e.preventDefault();
      const index = parseInt((<HTMLAnchorElement>e.target).getAttribute('data-index'), 10);
      this.toggle(index);
    };

    this.init();
  }

  init() {
    Array.prototype.forEach.call(this.triggers, (el: HTMLAnchorElement) => {
      el.addEventListener('click', this.onClickHandler);
    });
  }

  toggle(index: number) {
    const trigger = this.triggers[index];
    let collapses = this.collapses[index];
    let isOpen = trigger.classList.contains(this.option.activeClass);

    collapses.style.height = isOpen ? '0px' : `${collapses.scrollHeight}px`;
    trigger.classList.toggle(this.option.activeClass);
  }

  destroy() {
    Array.from(this.triggers, (el: HTMLAnchorElement) => {
      el.removeEventListener('click', this.onClickHandler);
    });
  }
}