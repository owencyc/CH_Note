# Angular-nice-bar
A nice and lightweight scrollbar in Angular.


### Demo

[Demo](http://forsigner.com/nice-bar)

### Install

```
bower install angular-nice-bar --save
```
### Usage

``` html
<link rel="stylesheet" href="bower_components/angular-nice-bar/dist/css/angular-nice-bar.css" />

<script src="bower_components/angular-nice-bar/dist/js/angular-nice-bar.js"></script>

```

```js
angular.module('app', ['ngNiceBar']);
```

#### As a directive

```js
angular.module('app', ['ngNiceBar']);
```

```html
<div nice-bar nice-bar-delay="1000" nice-bar-theme="dark">
  <!-- content here-->
</div>
```

#### As a service

``` html
<div id="container">
  <!-- content here-->
</div>
```

```js
angular.module('app', ['ngNiceBar'])
.controller('HomeCtrl', function($scope, niceBar) {
  $timeout(function() {
    niceBar.init(document.getElementById('container'));
  }, 10);
});
```

#### Custom theme

You can custom scrollbar style with CSS easily:

``` CSS
.nice-bar .nice-bar-slider-y {
  background: #222;
  /* whatever */
}
```

### License

  [MIT](LICENSE)
