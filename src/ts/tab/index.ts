
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

    this.option = Object.assign({
      index: 0,
      activeClass: 'is-active',
      onChange: () => {}
    }, option);

    this.onSelectHandler = (e: Event) => {
      e.preventDefault();
      this.select(parseInt((<HTMLAnchorElement>e.target).getAttribute('data-index')));
    };

    this.init();
  }

  init() {
    Array.from(this.tabs, (tab: HTMLAnchorElement) => {
      tab.addEventListener('click', this.onSelectHandler);
    });

    this.select(this.option.index);
  }

  select(index: number) {
    Array.from(this.tabs, (tab: HTMLAnchorElement) => {
      tab.classList.remove(this.option.activeClass);
    });

    Array.from(this.contents, (content) => {
      content.classList.remove(this.option.activeClass);
    });
    this.tabs[index].classList.add(this.option.activeClass);
    this.contents[index].classList.add(this.option.activeClass);

    this.option.onChange(this.contents[index]);
  }

  destroy() {
    Array.from(this.tabs, (tab: HTMLAnchorElement) => {
      tab.removeEventListener('click', this.onSelectHandler);
    });
  }
}