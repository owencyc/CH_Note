/**
 * Created by owenc on 2017/5/8.
 */
define([
        //"js/startup",
        "angular", "angularAMD",
        "app",
       "js/common", "js/router",

        "moment"
    ],
    function (angular, angularAMD, app) {
        'use strict';
        var $html, onDeviceReady = function () {
            angularAMD.bootstrap(app);
        };
        if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
            // URL: Running in Cordova/PhoneGap
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        if (typeof cordova === 'undefined') {
            //網頁時的啟動
            $html = angular.element(document.getElementsByTagName('html')[0]);
            angular.element().ready(function () {
                try {
                    onDeviceReady();
                } catch (e) {
                    console.error(e.stack || e.message || e);
                }
            });
        } else {
            //裝置上運行時的啟動
            //因為已經運行了startup.js, 所以已經deviceready了
            //document.addEventListener("deviceready", onDeviceReady, false);
            onDeviceReady();
        }
    });