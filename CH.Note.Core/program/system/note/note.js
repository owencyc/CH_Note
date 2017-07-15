/**
 * Created by owenc on 2017/7/16.
 */
define(["moment","ionic","text!config/noteList.json"], function (moment,ionic,noteList) {
    return ["$scope", "$filter", "$state", "$rootScope", "$ionicSideMenuDelegate",
        function ($scope, $filter, $state, $rootScope, $ionicSideMenuDelegate) {
            $scope.note={
                create_time:"",
                content:"",
                back_color:"",
                revise_time:""
            }
            $scope.back=function(){
                $rootScope.changeProgram("home");
            }
            $scope.init=function(){
                $scope.title=new moment().format('YYYY-MM-DD HH:mm');
            }
            $scope.submit=function(){
                console.log($scope.note.content);
            }
        }]
})