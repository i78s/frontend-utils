# i78s.frontend-utils

実務上でよく使う薄いライブラリ集


## インストール

```
$ npm install i78s.frontend-utils
```

## transitionendの取得

Android4.4.2が要件定義外なら不要

```js
import { transitionEndName } from 'i78s.frontend-utils';

const $test = document.getElementById('test');
$test.addEventListener(transitionEndName, () => {});
```

## スクロールの固定 / 解除

ドロワーメニューやモーダルを開いた時にスクロールを固定したい時などに使用する

```js
import { fixScroll, releaseScroll } from 'i78s.frontend-utils';

fixScroll();      // スクロールできなくする
releaseScroll();  // スクロール固定を解除
```

```sass
.js-no-scroll {
  position: fixed;
  width: 100%;
}
```


## シンプルなタブUI

```js
import { Tab } from 'i78s.frontend-utils';

const $tabs = document.querySelectorAll('.js-tab');
const $tabContents = document.querySelectorAll('.js-tab-content');
const tab = new Tab($tabs, $tabContents);
```

```sass
.js-tab {
  &.is-active {
    color: #f00;
    border: #f00;
  }
}

.js-tab-content {
  display: none;
  &.is-active {
    display: block;
  }
}
```

```html
<ul>
  <li><a class="js-tab is-active" data-index="0" href="#">tab1</a></li>
  <li><a class="js-tab" data-index="1" href="#">tab2</a></li>
  <li><a class="js-tab" data-index="2" href="#">tab3</a></li>
</ul>
<div>
  <div class="js-tab-content is-active">tab1 content</div>
  <div class="js-tab-content">tab2 content</div>
  <div class="js-tab-content">tab3 content</div>
</div>
```

## モーダルやドロワーメニューに使える汎用クラス


```js
import { Togglable } from 'i78s.frontend-utils';

$drawer = document.querySelector('.drawer');
const drawer = new Togglable($drawer);
drawer.show();
drawer.hide();
```

```sass
.drawer {
  transform: translateY(-100%);
  &.is-active {
    transform: translateY(0);
  }
}
```
