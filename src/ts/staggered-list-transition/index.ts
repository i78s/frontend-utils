/**
 * 要素をスタッガリングリストトランジションさせるクラス
 */
import { RafInterval, rafInterval, rafClearInterval } from '../raf-interval';

interface StaggeredListTransitionOption {
  delay?: number;
  duration?: number;
  showClass?: string;
  hideClass?: string;
  outClass?: string;
}

export default class StaggeredListTransition {
  
  option: StaggeredListTransitionOption;
  private $elements: HTMLCollectionOf<HTMLDivElement>;
  private timer: RafInterval;

  constructor(className: string, option?: StaggeredListTransitionOption) {
    this.option = {
      delay: 80,
      duration: 400,
      showClass: 'is-show',
      hideClass: 'is-hide',
      outClass: 'is-out',
      ...option
    };

    this.$elements = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName(className);
    this.timer = { id: 0 };
  }

  show() {
    return this.animate(true);
  }

  hide() {
    return this.animate(false)
      .then(() => {
        Array.prototype.forEach.call(this.$elements, (el: HTMLDivElement) => {
          el.classList.remove(this.option.showClass, this.option.hideClass, this.option.outClass);
        });
      });
  }

  /**
   * タイミングをずらしながら順番にクラスを付与する
   * @param bool
   * @returns {Promise<void>}
   */
  private animate(bool: boolean): Promise<void> {
    const modifier = bool ? this.option.showClass : this.option.hideClass;
    let $targets:Array<HTMLDivElement> = [];

    rafClearInterval(this.timer);

    if (bool) {
      $targets = Array.prototype.filter.call(this.$elements, (el: HTMLDivElement) => {
        return !el.classList.contains(this.option.showClass);
      });
    } else {
      let length = this.$elements.length;

      while (length) {
        const el: HTMLDivElement = this.$elements.item(length - 1);
        if (this.isInScreen(el)) {
          $targets.push(el);
        } else  {
          el.classList.add(this.option.outClass);
        }
        length--;
      }
    }

    return new Promise<void>((resolve) => {
      let index = 0;

      this.timer = rafInterval(() => {
        const target = $targets[index];
        target.classList.add(modifier);

        if (index === $targets.length - 1) {
          rafClearInterval(this.timer);

          if (!target) {
            resolve();
            return;
          }
          target.addEventListener('transitionend', function cb(e) {
            const currentTarget = e.currentTarget;
            if (currentTarget !== target) {
              return;
            }
            currentTarget.removeEventListener(e.type, cb);
            resolve();
          });
        }

        index++;
      }, this.option.delay);
    });
  }

  /**
   * 要素が画面内にあるかどうかを返す
   * @private
   */
  private isInScreen(target: HTMLDivElement): boolean {
    const offsetTop = target.offsetTop;
    const offsetBottom = offsetTop + target.clientHeight;
    if (offsetTop >= this.getOffsetBottom() || offsetBottom <= this.getOffsetTop()) {
      return false;
    }
    return true;
  }

  private getOffsetTop(): number {
    return window.pageYOffset;
  }

  private getOffsetBottom(): number {
    return this.getOffsetTop() + window.innerHeight;
  }
}
