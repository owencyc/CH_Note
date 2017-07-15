angular.module('perfect_scrollbar', []).directive('perfectScrollbar',
  ['$parse', '$window', function($parse, $window) {
  /**
    *     wheelSpeed 
    *     wheelPropagation
    *     minScrollbarLength
    *     useBothWheelAxes
    *     useKeyboard
    *     suppressScrollX
    *     suppressScrollY
    *     scrollXMarginOffset
    *     scrollYMarginOffset
    *     includePadding
	*/
	var psOptions = [
	    'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'maxScrollbarLength', 'useBothWheelAxes',
	    'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
	    'scrollYMarginOffset', 'includePadding'//, 'onScroll', 'scrollDown'
	];
    var default_options = {
        'wheelPropagation':true, //If this option is true, when the scroll reaches the end of the side, mousewheel event will be propagated to parent element.
        'suppressScrollX':true,  //When set to true, the scroll bar in X axis will not be available, regardless of the content width.
        'minScrollbarLength':10
    };
    
    return {
      restrict: 'C',
      transclude: true,
      template: '<div><div ng-transclude></div></div>',
      replace: true,
      link: function($scope, $elem, $attr) {
        var jqWindow = angular.element($window);
        var options = default_options;
        $elem = $($elem[0]).css('overflow', 'hidden');
        for (var i=0, l=psOptions.length; i<l; i++) {
          var opt = psOptions[i];
          if ($attr[opt] !== undefined) {
            options[opt] = $parse($attr[opt])();
          }
        }
    
        $scope.$evalAsync(function() {
          $elem.perfectScrollbar(options);
          var onScrollHandler = $parse($attr.onScroll)
          $elem.scroll(function(){
            var scrollTop = $elem.scrollTop()
            var scrollHeight = $elem.prop('scrollHeight') - $elem.height()
            $scope.$apply(function() {
              onScrollHandler($scope, {
                scrollTop: scrollTop,
                scrollHeight: scrollHeight
              })
            })
          });
        });
    
        function update(event) {
          $scope.$evalAsync(function() {
            if ($attr.scrollDown == 'true' && event != 'mouseenter') {
              setTimeout(function () {
                $($elem).scrollTop($($elem).prop("scrollHeight"));
              }, 100);
            }
            $elem.perfectScrollbar('update');
          });
        }
    
        // This is necessary when you don't watch anything with the scrollbar
        $elem.bind('mouseenter', function(){
        	update('mouseenter');
        });
    
        // Possible future improvement - check the type here and use the appropriate watch for non-arrays
        if ($attr.refreshOnChange) {
          $scope.$watchCollection($attr.refreshOnChange, function() {
            update();
          });
        }

        //listent the child's size;
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var MutationObserverConfig={
            childList: true,
            attributes: true,
            characterData: false
        };
        var observer=new MutationObserver(function(mutations){
        	update();
        });
        observer.observe($elem.find('[ng-transclude]')[0],MutationObserverConfig);
        /*
        console.log($elem.find('[ng-transclude]').html());
        $elem.find('[ng-transclude]').resize(function(){
        	update();
        });
    	*/
        // this is from a pull request - I am not totally sure what the original issue is but seems harmless
        if ($attr.refreshOnResize) {
          jqWindow.on('resize', update);
        }
    
        $elem.bind('$destroy', function() {
          jqWindow.off('resize', update);
          $elem.perfectScrollbar('destroy');
        });
    
      }
    };
}]);
