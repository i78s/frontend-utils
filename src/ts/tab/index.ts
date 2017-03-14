
interface TabOption {
  index?: number;
  activeClass?: string;
  onChange?(content: HTMLDivElement): void;
}

export default class Tab {

  private tabs: NodeListOf<HTMLAnchorElement>;
  private contents: NodeListOf<HTMLDivElement>;
  option: TabOption;

  private onSelectHandler: (e: Event) => void;

  constructor(tabs: NodeListOf<HTMLAnchorElement>, contents: NodeListOf<HTMLDivElement>, option?: TabOption) {
    this.tabs = tabs;
    this.contents = contents;

    this.option = {
      index: 0,
      activeClass: 'is-active',
      onChange: () => {},
      ...option
    };

    this.onSelectHandler = (e: Event) => {
      e.preventDefault();
      this.select(parseInt((<HTMLAnchorElement>e.target).getAttribute('data-index')));
    };

    this.init();
  }

  init() {
    Array.prototype.forEach.call(this.tabs, (tab: HTMLAnchorElement) => {
      tab.addEventListener('click', this.onSelectHandler);
    });

    this.select(this.option.index);
  }

  select(index: number) {
    Array.prototype.forEach.call(this.tabs, (tab: HTMLAnchorElement) => {
      tab.classList.remove(this.option.activeClass);
    });

    Array.prototype.forEach.call(this.contents, (content: HTMLDivElement) => {
      content.classList.remove(this.option.activeClass);
    });
    this.tabs[index].classList.add(this.option.activeClass);
    this.contents[index].classList.add(this.option.activeClass);

    this.option.onChange(this.contents[index]);
  }

  destroy() {
    Array.prototype.forEach.call(this.tabs, (tab: HTMLAnchorElement) => {
      tab.removeEventListener('click', this.onSelectHandler);
    });
  }
}