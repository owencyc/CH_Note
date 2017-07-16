/**
 * Created by owenc on 2017/7/16.
 */
define(["moment","ionic","text!config/noteList.json"], function (moment,ionic,noteList) {
    return ["$scope", "$filter", "$state", "$rootScope","$cordovaSQLite",
        function ($scope, $filter, $state, $rootScope,$cordovaSQLite) {
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
                var db = $cordovaSQLite.openDB({ name: "my.db", location: 'default' });
                db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (time, content)');
                    tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', [$scope.title, $scope.note.content]);
                }, function(error) {
                    alert('Transaction ERROR: ' + error.message);
                }, function() {
                    alert('Populated database OK');
                });

                db.transaction(function(tx) {
                    tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
                        alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                    }, function(tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                });

            }
        }]
})