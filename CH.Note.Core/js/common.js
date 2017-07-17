/**
 * Created by owenc on 2017/5/8.
 */
define(["app", "moment",'text!config/config.json'], function (app, moment,info) {
    app.run(function ($state, $rootScope, $filter, $cookies) {
        $rootScope.loadFinish = false;
        console.log(navigator.userAgent);
        if ($cookies.get("log_info")) {
            $rootScope.user = $cookies.getObject("log_info");
        } else {
            $rootScope.user = {
                user_no: "",
                user_name: "",
                loginTime: "",
                auth: 0,
                Ticket: "",
                department_no: ''
            }
        }
        //存储访问url
        $rootScope.url = JSON.parse(info).url;
        //获取持久化的program路由参数，解决用户刷新页面，显示异常
        if ($cookies.get("nav_no")) {
            $rootScope.nav_no = $cookies.get("nav_no");
        } else {
            $rootScope.nav_no = "";
        }
        //$rootScope.$on('$routeChangeSuccess', function () {
        //    console.log("路由切换成功！");
        //});
        // 紀錄目前Loading的狀態
        //disabled : true - 隱藏/false - 顯示
        $rootScope.Loading = {
            disabled: true,
            count: 0,
            msg: ''
        }

        //顯示Loading, 會記錄目前顯示幾次Loading
        $rootScope.showLoading = function (msg) {
            angular.element(document.getElementsByClassName('LoadingContener')[0]).removeClass('ng-hide');
            $rootScope.Loading.msg = msg || 'Loading...';
            $rootScope.Loading.disabled = false;
            $rootScope.Loading.count++;
        }
        window.showLoading = function (msg) {
            $timeout(function () {
                $rootScope.showLoading(msg);
            });
        }

        //隱藏Loading, 當Loading 全部被關閉的時候才會完全關閉
        $rootScope.hideLoading = function (isForce) {
            if (isForce) {
                $rootScope.Loading.count = 0;
            }

            $rootScope.Loading.count--;
            if ($rootScope.Loading.count <= 0) {
                angular.element(document.getElementsByClassName('LoadingContener')[0]).addClass('ng-hide');
                $rootScope.Loading.disabled = true;
                $rootScope.Loading.count == 0;
            }
        }
        window.hideLoading = function (isForce) {
            $timeout(function () {
                $rootScope.hideLoading(isForce);
            });
        }

        //顯示 Alert
        $rootScope.showAlert = function (alertMsg, confirm) {
            $mdDialog.alert(alertMsg, confirm);
        }
        window.showAlert = function (alertMsg, confirm) {
            $timeout(function () {
                $rootScope.showAlert(alertMsg, confirm);
            });
        }

        //顯示 confirm
        $rootScope.showConfirm = function (alertMsg, confirm, cancel) {
            $mdDialog.confirm(alertMsg, confirm, cancel);
        }

        //顯示Select
        /*
         * options : {
         * 	title   : 標題
         *  label   : list 中外顯值得變數名稱
         *  code    : list 中內存值的變數名稱
         *  selectCode : 預設值，對應code設定的變數
         *  list    : 要呈現的list
         *  confirm : 按下list以後的處理，會傳入dialog，可以用dialog.hide()
         *            關閉開窗
         * }
         */
        $rootScope.showSelect = function (options) {
            if (options.list.length != 0) {
                $mdDialog.dialog('plugins/angular-material-lite/template/radioList.tmp.html', function (dialog) {
                    return {
                        title: options.title,
                        label: options.label,
                        code: options.code,
                        selectCode: options.selectCode,
                        back: function () {
                            this.hide();
                        },
                        itemList: options.list,
                        itemClick: function (item, event) {
                            //$translate.use(item.code);
                            //$scope.currentUse = item.code;
                            if (options.confirm)
                                options.confirm(item, this);
                            //this.hide();
                        },
                        itemCancel: function () {
                            dialog.hide();
                            if (options.cancel)
                                options.cancel(this);
                        },
                        isCancel: options.cancel != undefined
                    }
                });
            } else {
                $rootScope.showAlert($filter('translate')('common.msg.no_data'));
            }
        }

        // Change Program
        $rootScope.changeProgram = function (program, parameters, isLeave) {
            //$rootScope.reciprocalRestart();
            if (typeof(parameters) == 'boolean') {
                isLeave = parameters;
            } else {
                isLeave = isLeave || false;
            }

            if (!isLeave) {
                //從任何地點 > 載入一般程式
                $rootScope.programState = 'load-program';
            } else {
                //從其他程式> 載入home
                $rootScope.programState = 'leave-program';
            }

            if (parameters != undefined) {
                $state.go(program, parameters);
            } else {
                $state.go(program);
            }
        }

        /***
         * 顯示 local Notification, 由App本身所觸發的通知
         * 此部分有加入使用html5 實作 web browser 通知
         * data {
		 *     id : id表示此訊息的身分,當有兩個相同的id時,後者會覆蓋前者
		 *     msg : 通知的訊息
		 *     sound : 通知的聲音, 預設是file://sound/sound.mp3
		 *     target : 點擊通知訊息後會開啟的頁面
		 * }
         */
        $rootScope.ShowNotification = function (data, prepareData, clickHandler) {
            try {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                    cordova.plugins.notification.local.schedule(prepareData(data));
                    cordova.plugins.notification.local.on("click", clickHandler(data), this);
                } else {
                    //產生HTML5的通知
                    Notification.requestPermission(function (permission) {
                        var feedbackData = prepareData(data);
                        var notification = new Notification(feedbackData.title, {
                            body: feedbackData.text,
                            dir: 'auto'
                        });
                        notification.click = function () {
                            window.location = "/";
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }


    }).directive('minHeight',function ($window) {
        return {
            restrict : 'A',
            scope : {},
            link : function($scope, element, attrs) {
                element.css('min-height',
                    ($window.innerHeight-88) + 'px');
            }
        };
    }).directive('autoHeight',function ($window) {
        return {
            restrict : 'A',
            scope : {},
            link : function($scope, element, attrs) {
                element.css('height',
                    ($window.innerHeight-44) + 'px');
            }
        };
    }).directive('specialHeight',function ($window) {
        return {
            restrict : 'A',
            scope : {},
            link : function($scope, element, attrs) {
                var winowWeight = $window.innerWidth; //获取窗口宽度
                element.css('height',
                    (winowWeight * 0.47) + 'px');
            }
        };
    }).directive('repeatFinish', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                //console.log(scope.$index)
                if (scope.$last == true) {
                    //console.log('ng-repeat执行完毕')
                    scope.$eval(attr.repeatFinish)
                }
            }
        }
    }).directive('contenteditable', ['$sce', function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$evalAsync(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if ( attrs.stripBr && html == '<br>' ) {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    }]).factory('authInterceptor', function($rootScope){
        return {
            request: function(config){
                config.headers = config.headers || {};
                //if($cookies.get('token')){
                //    config.headers.authorization = 'Bearer ' + $cookies.get('token');
                //}
                if ($rootScope.user.Ticket) {
                    config.headers.Authorization = 'BasicAuth ' + $rootScope.user.Ticket;
                    //console.log($rootScope.user.Ticket);
                }
                return config;
            }
            
        };
    }).config(['$httpProvider', function ($httpProvider, $rootScope) {
        $httpProvider.interceptors.push('authInterceptor');
    }]).filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.length-1;
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })
    ;
})
