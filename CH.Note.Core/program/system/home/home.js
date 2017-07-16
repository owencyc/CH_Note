/**
 * Created by owenc on 2017/7/15.
 */
define(["moment","ionic","text!config/noteList.json"], function (moment,ionic,noteList) {
    return ["$scope", "$filter", "$state", "$rootScope","$ionicSideMenuDelegate","$ionicScrollDelegate","$timeout","$ionicViewSwitcher",
        function ($scope, $filter, $state, $rootScope,$ionicSideMenuDelegate,$ionicScrollDelegate,$timeout,$ionicViewSwitcher) {
            $scope.init=function(){
                $scope.toggleLeft = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };
                var list=JSON.parse(noteList);
                $scope.notes=[]
                for(var i=0;i<list.length;i+=2){
                    var row={data:[]}
                    var temp={
                        content:"",
                        create_time:"",
                        revise_time:"",
                        back_color:""
                    }
                    temp.content=list[i].content;
                    temp.create_time=list[i].create_time;
                    temp.revise_time=list[i].revise_time;
                    temp.back_color=list[i].back_color;
                    row.data.push(temp);
                    if(i+1<list.length) {
                        temp={
                            content:"",
                            create_time:"",
                            revise_time:"",
                            back_color:""
                        }
                        temp.content = list[i + 1].content;
                        temp.create_time = list[i + 1].create_time;
                        temp.revise_time = list[i + 1].revise_time;
                        temp.back_color = list[i + 1].back_color;
                        row.data.push(temp);
                    }
                    $scope.notes.push(row)
                }
                console.log($scope.notes);
            }
            $scope.addNote=function(){
                $rootScope.changeProgram("newnote");
                $ionicViewSwitcher.nextDirection("forward");
            }
            $scope.refreshScroll=function(){
                //console.log("事件");
                $ionicScrollDelegate.resize();

            }


        }]
})