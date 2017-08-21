
interface ScrollIntoViewOption {
  switchClass?: string;
  offset?: number;
}

interface ScrollIntoViewElement extends HTMLDivElement {
  _isShow: boolean;
}

export default class ScrollIntoView {

  private option: ScrollIntoViewOption;
  private targets: HTMLCollectionOf<ScrollIntoViewElement>;
  private offsetTops: Array<number>;
  private scrollBottom: number;


  constructor(className: string, option?: ScrollIntoViewOption) {
    this.option = <ScrollIntoViewOption>Object.assign({
      switchClass: 'is-show',
      offset: 0 // チェックする場所を調整するための値 （画面下の部分からずらす）
    }, option);

    this.targets = <HTMLCollectionOf<ScrollIntoViewElement>>document.getElementsByClassName(className);
    this.offsetTops = [];
    this.scrollBottom = this.getScrollBottom();

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('scroll', this.scrollHandler);
  }

  init(offset = 0) {
    this.updateOffsetTop();
    this.update(offset);
  }

  private scrollHandler = function() {
    this.scrollBottom = this.getScrollBottom();
    this.update();
  }.bind(this);

  private resizeHandler = function() {
    this.updateOffsetTop();
  }.bind(this);

  /**
   * クラス付与対象の要素のoffsetTopを更新する
   */
  private updateOffsetTop() {
    Array.prototype.forEach.call(this.targets, (el: ScrollIntoViewElement, i: number) => {
      this.offsetTops[i] = el.offsetTop;
    });
  }

  /**
   * クラス付与対象の要素の状態を更新する
   */
  private update(offset: number) {
    const threshold = this.scrollBottom - (offset || this.option.offset);

    Array.prototype.forEach.call(this.targets, (el: ScrollIntoViewElement, i: number) => {
      const offsetTop = this.offsetTops[i];
      const isPassed = this.isPassed(offsetTop, threshold);

      if (!el._isShow && isPassed) {
        el.classList.add(this.option.switchClass);
        el._isShow = true;
      }
    });
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private isPassed(offsetTop: number, threshold: number): boolean {
    return offsetTop < threshold;
  }

  private getScrollBottom(): number {
    return window.innerHeight + window.pageYOffset;
  }
}
