'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('App', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        // define: function(RegisterApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.RegisterApp', function(RegisterAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.RegisterApp';

        RegisterAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', RegisterAppRouter.name);
                // start ourselves
                // App.switchApp('RegisterApp', {});
            },
            appRoutes: {
                '': 'listRegister',
                'register': 'listRegister',
                // 'register/create': 'createRegister',
                // 'register/:slug' : 'showRegister'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('RegisterApp');
            action(arg);
            // App.execute('set:active:page', 'register');
        };

        var API = {
            listRegister : function() {
                require(['register_list_controller'], function(ListController) {
                    App.log('List register: Controller loaded, requesting register..', RegisterAppRouter.name, 2);
                    executeAction(ListController.listRegister);
                });
            },
        };

        // also watch for manual events:
        App.on('register:list', function() {
            App.navigate('/register');
            API.listRegister();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', RegisterAppRouter.name, 2);
            new RegisterAppRouter.Router({
                controller: API
            });
        });
    });

    return App.RegisterAppRouter;
});