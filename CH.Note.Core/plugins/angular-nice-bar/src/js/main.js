'use strict';

var nb = require('nice-bar');

module.exports = angular
  .module('ngNiceBar', [])
  .directive('niceBar', niceBarDirective)
  .factory('niceBar', niceBarService);

function niceBarDirective() {
  return {
    restrict: 'AE',
    link: function(scope, element, attr) {
      var delay = 0;
      var theme = 'light';

      if (attr.niceBarDelay) {
        delay = parseInt(attr.niceBarDelay, 10);
        if (delay.toString() === NaN.toString()) {
          throw new Error('nice-bar-delay shoule be a number');
        }
      }

      if (attr.niceBarTheme) {
        delay = attr.niceBarTheme;
      }

      setTimeout(function() {
        nb.init(element[0], {theme: theme});
      }, delay);
    }
  };
}


// @ngInject
function niceBarService() {
  return {
    init: function(element, options) {
      if (options) {
        options = {theme: options.theme || 'light'};
      } else {
        options = {theme: 'light'};
      }
      console.log(options);
      // nb.init(element, {theme: options.theme});
      nb.init(element, {theme: 'dark'});
    }
  };
}
