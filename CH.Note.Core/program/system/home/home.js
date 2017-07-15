/**
 * Created by owenc on 2017/7/15.
 */
define(["moment","ionic"], function (moment,ionic) {
    return ["$scope", "$filter", "$stateParams", "$rootScope","$ionicSideMenuDelegate",
        function ($scope, $filter, $stateParams, $rootScope,$ionicSideMenuDelegate) {
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }]
})