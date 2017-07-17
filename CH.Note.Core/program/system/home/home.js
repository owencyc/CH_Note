/**
 * Created by owenc on 2017/7/15.
 */
define(["moment","ionic","text!config/noteList.json"], function (moment,ionic,noteList) {
    return ["$scope", "$filter", "$state", "$rootScope","$ionicSideMenuDelegate","$ionicScrollDelegate","$timeout","$ionicViewSwitcher",
        function ($scope, $filter, $state, $rootScope,$ionicSideMenuDelegate,$ionicScrollDelegate,$timeout,$ionicViewSwitcher) {
            var db = null;
            var list=[];
            $scope.notes=[]
            $scope.init=function(){
                $scope.toggleLeft = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };


                document.addEventListener('deviceready', function() {
                    db = window.sqlitePlugin.openDatabase({name: 'CH_NOTE.db', location: 'default'});
                });
                db.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM tblnote order by revise_time desc', [], function(tx, rs) {
                        console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                        for(var i=0;i<rs.rows.length;i++){
                            var item={
                                content:rs.rows.item(i).content,
                                create_time:rs.rows.item(i).create_time,
                                revise_time:rs.rows.item(i).revise_time,
                                back_color:rs.rows.item(i).color
                            }
                            list.push(item);
                        }
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
                    }, function(tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                });

                //var list=allList;


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