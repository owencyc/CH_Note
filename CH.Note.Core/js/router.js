/**
 * Created by owenc on 2017/5/8.
 */
define(['app', 'angularAMD', 'text!config/program.json', 'angular-ui-router', 'loader-static-files'], function (app, angularAMD, program) {
    'use strict';
    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        // Don't sync the url till we're ready
        $urlRouterProvider.deferIntercept();

        //Setting System Router
        $stateProvider
            .state("login", angularAMD.route({
                url          : "/login",
                params       : {},
                templateUrl  : "program/login/login.html",
                controllerUrl: "program/login/login.js",
                css          : "program/login/login.css"
            }))
            .state("test", angularAMD.route({
                url          : "/test",
                params       : {
                    "data":{}
                },
                templateUrl  : "program/system/test/test.html",
                controllerUrl: "program/system/test/test.js"
            }))
            .state("navigation", angularAMD.route({
                url: "/navigation",
                params       : {},
                templateUrl: "program/system/navigation/navigation.html",
                controllerUrl: "program/system/navigation/navigation.js",
                css: "program/system/navigation/navigation.css"
            }))
            .state("navigation.program", angularAMD.route({
                url: "/program",
                params       : {type:''},
                templateUrl  : "program/Courses/courseMaster.html",
                controllerUrl: "program/Courses/courseMaster.js",
                css          : ["program/Courses/courseMaster.css","program/system/navigation/navigation.css"]
            }))
            .state("navigation.notice", angularAMD.route({
                url: "/notice",
                params: { type: '' },
                templateUrl: "program/notice/notice.html",
                controllerUrl: "program/notice/notice.js",
                css: ["program/notice/notice.css","program/system/navigation/navigation.css"]
            }));
        $urlRouterProvider.otherwise('/login');
        program = JSON.parse(program);
        angular.forEach(program,function(value, key){
            var state = angularAMD.route(value);

            state.onEnter = function(){
                //TODO
            };
            if(state.default == true){
                $urlRouterProvider.otherwise(value.url);
            }
            $stateProvider.state(value.name, state);
        });
    }]).run(['$urlRouter', function($urlRouter){
        $urlRouter.sync();
        $urlRouter.listen();
    }]);
});