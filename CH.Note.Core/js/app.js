/**
 * Created by owenc on 2017/5/8.
 */
var requirePlugin = [
    "angular", "angularAMD", "moment","ionic",
    //"angular-material",
    "angular-material-lite", "angular-swipe", "angular-animate",
    "angular-touch", "angular-ui-router", "angular-css", "angular-translate",
    "angular-sanitize", "semantic", "angular-file-upload", "angular-cookies","ionic-angular","angular-animate","ngCordova"
];
var model = [
    "ui.router", "pascalprecht.translate", "angularCSS", "ngMaterialLite",
    "swipe", "ngAnimate", "ngSanitize", "ngTouch", "angularFileUpload", "ngCookies","ionic","ngAnimate","ngCordova"
];
if(window.cordova){
    //APP 版本
} else {
    requirePlugin.push("ng-scrollbar");
    model.push("ngScrollbar");
}
define(requirePlugin,
    function (angular, angularAMD, moment, ionic,d3) {
        'use strict';
        return angular.module("app",model);
    }
);