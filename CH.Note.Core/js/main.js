/**
 * Created by owenc on 2017/5/8.
 */
require.config({
    baseUrl: "./",
    paths: {
        // angular
        "angular": "plugins/angular/angular.min",
        // angular-ui
        "angular-ui-router": "plugins/angular-ui-router/angular-ui-router",
        // angular-animate
        "angular-animate": "plugins/angular-animate/angular-animate.min",
        // angular-aria
        "angular-aria": "plugins/angular-aria/angular-aria.min",
        // angular-material
        //"angular-material": "plugins/angular-material/angular-material.min",
        "material-design-lite": "plugins/angular-material-lite/material-design-lite/material",
        "angular-material-lite": "plugins/angular-material-lite/angular-material-lite",
        // angular-css
        "angular-css": "plugins/angular-css/angular-css",
        // angular-translate
        "angular-translate": "plugins/angular-translate/angular-translate.min",
        // angular-resource
        "angular-resource": "plugins/angular-resource/angular-resource.min",
        "loader-static-files" : "plugins/angular-translate/loader-static-files.min",
        // angular-touch
        "angular-touch" : "plugins/angular-touch/angular-touch.min",
        "angular-pinch-zoom" : "plugins/angular-pinch-zoom/ng-pinch-zoom",
        // angular-scroll
        "angular-swipe" : "plugins/angular-swipe/angular-swipe",
        // angular-sqlite
        "angular-sqlite" : "plugins/angular-sqlite/angular-sqlite",
        // angularAMD
        "angularAMD": "plugins/angularAMD/angularAMD",
        //angular-Sanitize
        "angular-sanitize" : "plugins/angular-sanitize/angular-sanitize.min",
        "d3": "plugins/d3/d3",

        // moment
        "moment": "plugins/moment/moment.min",

        //jquery
        "jquery": "plugins/jQuery/jquery-2.2.4.min",
        //semantic
        "semantic":"plugins/semantic/semantic.min",
// ionic
        "ionic": "plugins/ionic/js/ionic.min.1.2.4",
        "ionic-angular": "plugins/ionic/js/ionic-angular.min.1.2.4",
        //angular-cookies
        "angular-cookies": "plugins/angular-cookies/angular-cookies.min",
        //ng-scrollbar
        "ng-scrollbar": "plugins/ng-scrollbar/dist/ng-scrollbar",
        //angular-file-upload
        "angular-file-upload": "plugins/angular-file-upload/dist/angular-file-upload.min",
        //ngCordova
        "ngCordova":"plugins/ng-cordova/ng-cordova.min",
        //bootstrap
        "bootstrap": "plugins/bootstrap/bootstrap.min",
        'text':   'plugins/requirejs/text',
        //'print': 'plugins/print/print',
        'app' : 'js/app'
    },
    shim: {
        // angular
        "angular": { exports: "angular" },

        // angular-ui
        "angular-ui-router": ["angular"],
        // angular-css
        "angular-css": ["angular"],
        // angular-animate
        "angular-animate": ["angular"],
        // angular-aria
        "angular-aria": ["angular"],
        // angular-css
        //"angular-material": {
        //	deps : ["angular-animate", "angular-aria"]
        //},
        "angular-material-lite" : {deps:["material-design-lite", "angular", "d3"]},
        // angular-translate
        "angular-translate": ["angular"],
        "loader-static-files": ["angular-translate"],

        //angular-touch
        "angular-touch" : ["angular"],
        "angular-pinch-zoom" : ["angular"],
        "angular-swipe" : ["angular"],
        "angular-sanitize" : ["angular"],
        //angular-sqlite
        "angular-sqlite" : ["angular"],

        // angularAMD
        "angularAMD": ["angular"],
        //"angular-cookies"
        "angular-cookies": ["angular"],
        //semantic
        "semantic":["jquery"],
        //angular-file-upload
        "angular-file-upload": ["angular"],
        //ng-scrollbar
        "ng-scrollbar":["angular","angular-sanitize"],
        // ionic
        "ionic": { exports: "ionic" },
        "ionic-angular": ["ionic", "angular", "angular-animate", "angular-sanitize", "angular-resource"],
        //ngCordova
        "ngCordova":["angular"],
        "cordova":{exports: 'cordova'},

    },
    waitSeconds: 15,
    deps: ['js/bootstrap']
});