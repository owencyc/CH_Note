/**
 * Created by owenc on 2017/5/8.
 */
define(["moment"], function (moment) {
    return ["$scope", "$filter", "$stateParams", "$rootScope", '$http', '$cookieStore', '$cookies',
        function ($scope, $filter, $stateParams, $rootScope, $http, $cookieStore, $cookies) {
            $scope.login=function() {

                if ($scope.user_no == null || $scope.password == null)
                {
                    var error1 = document.getElementById('error1');
                    error1.innerHTML = '用户名或密码不能为空!';
                }
                else
                {
                    $http({
                        method: 'post',
                        url: $rootScope.url+'UserMain/ConfirmUser',
                        dataType: 'jsonp',
                        data: {user_no:$scope.user_no,password:$scope.password}
                    }).success(function (resp) {
                        if (resp.Results.success == true) {
                            $rootScope.user.user_no = resp.Results.user_no;
                            $rootScope.user.user_name = resp.Results.user_name;
                            $rootScope.user.department_no = resp.Results.department_no;
                            $rootScope.user.Ticket = resp.Results.Ticket;
                            $rootScope.user.auth = resp.Results.user_type;
                            $rootScope.user.loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            //存进cookie
                            var expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            $cookies.putObject("log_info", $rootScope.user, { 'expires': expireDate });

                            $rootScope.changeProgram('navigation');
                        }
                        else {
                            var error2 = document.getElementById('error2');
                            error2.innerHTML = '用户名或密码输入错误!';
                        }


                    })
                }
            }
        }];
})
