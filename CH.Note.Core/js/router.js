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

            .state("home", angularAMD.route({
                url          : "/home",
                params       : {
                    "data":{}
                },
                templateUrl  : "program/system/home/home.html",
                controllerUrl: "program/system/home/home.js",
                css          : "program/system/home/home.css"
            }));
        $urlRouterProvider.otherwise('/home');
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