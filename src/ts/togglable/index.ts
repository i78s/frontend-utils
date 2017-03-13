import transitionEndName from '../get-transitionend-name';

const noop = () => {};

interface TogglableOption {
  toggleClassName?: string;
  onShow?(): void;
  onHide?(): void;
}

export default class Togglable {

  private element: HTMLDivElement;
  option: TogglableOption;

  private onTransitionEnd: (e: Event) => void;

  constructor(element: HTMLDivElement, option?: TogglableOption) {
    this.element = element;
    this.option = {
      toggleClassName: 'is-active',
      onShow: noop,
      onHide: noop,
      ...option
    };

    this.onTransitionEnd = (e) => {
      e.preventDefault();
      if (e.target !== this.element) {
        return;
      }
      if (!this.isShow()) {
        return;
      }
      // 開く時はアニメーション終了後にスクロールできなくした方がカクつかない
      this.option.onShow();
    };

    this.init();
  }

  init() {
    this.element.addEventListener(transitionEndName, this.onTransitionEnd);
  }

  show() {
    this.element.classList.add(this.option.toggleClassName);
  }

  hide() {
    this.element.classList.remove(this.option.toggleClassName);
    this.option.onHide();
  }

  isShow() {
    return this.element.classList.contains(this.option.toggleClassName);
  }

  destroy() {
    this.element.removeEventListener(transitionEndName, this.onTransitionEnd);
  }
}

