/**
 * Created by owenc on 2017/7/16.
 */
define(["moment","ionic","text!config/noteList.json"], function (moment,ionic,noteList) {
    return ["$scope", "$filter", "$state", "$rootScope","$cordovaSQLite","$ionicPopup",
        function ($scope, $filter, $state, $rootScope,$cordovaSQLite,$ionicPopup) {
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
            function isEmpty(obj) {
                if (obj === null) return true;
                if (typeof obj === 'undefined') {
                    return true;
                }
                if (typeof obj === 'string') {
                    if (obj === "") {
                        return true;
                    }
                    var reg = new RegExp("^([ ]+)|([　]+)$");
                    return reg.test(obj);
                }
                return false;
            }
            $scope.back=function(){
                if(!isEmpty($scope.note.content.trim())){
                    var confirmPopup = $ionicPopup.confirm({
                        title: '亲爱的',
                        template: '你还有没保存哦~确定离开吗？',
                        cancelText:'不要',
                        okText:'是的',
                        okType:'button-energized'
                    });
                    confirmPopup.then(function(res) {
                        if(res) {
                            $rootScope.changeProgram("home",true);
                        } else {
                            console.log('留下来保存');
                        }
                    });
                }else{
                    $rootScope.changeProgram("home",true);
                }
            };
            $scope.submit=function(){
                var revise_time=new moment().format('YYYY/MM/DD HH:mm');
                console.log($scope.note.content);
                var db = $cordovaSQLite.openDB({ name: "CH_NOTE.db", location: 'default' });
                db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tblnote (create_time, content,revise_time,color)');
                    tx.executeSql('INSERT INTO tblnote VALUES (?,?,?,?)', [revise_time, $scope.note.content,revise_time,'blue']);
                }, function(error) {
					
						 var alertPopup = $ionicPopup.alert({
						   title: '错误!',
						   template: '保存失败：'+error.message,
						   okText:'好吧...'
						 });
						 alertPopup.then(function(res) {
						   console.log('保存失败');
						 });
					
                }, function() {
                    var alertPopup = $ionicPopup.alert({
                        title: '亲爱的',
                        template: '保存成功咯！',
                        okText:'好的'
                    });
                    alertPopup.then(function(res) {
                        $rootScope.changeProgram("home",true);
                    });

                });

                //db.transaction(function(tx) {
                //    tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
                //        alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                //    }, function(tx, error) {
                //        alert('SELECT error: ' + error.message);
                //    });
                //});

            }
        }]
})
