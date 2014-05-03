'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Register = Backbone.Model.extend({
            urlRoot: 'register',

            defaults: {
                name: '',
                slug: ''
            },

            validate: function(attrs) { // , options
                var errors = {};
                if (!attrs.fileName) {
                    errors.fileName = 'can\'t be blank';
                }
                //     if (! attrs.somethingelse) {
                //       errors.lastName = 'can't be blank';
                //     }
                //     else{
                //       if (attrs.somethingelse.length < 2) {
                //         errors.somethingelse = 'is too short';
                //       }
                //     }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.RegisterCollection = Backbone.Collection.extend({
            url: '/',
            model: Entities.Register
        });

        var initializeRegisters = function() {
            App.log('Initializing Fake Registers', contextName, 1);

            var fakeRegisters = new Entities.RegisterCollection([{
                name: 'First Register',
                slug: 'page-1'
            }, {
                name: 'Second Register',
                slug: 'page-2'
            }]);

            return fakeRegisters;
        };

        var API = {
            getRegisterEntities: function() {
                App.log('register:entities event detected', contextName, 1);
                var registerCollection = new Entities.RegisterCollection();
                registerCollection.reset(initializeRegisters().models); // update the collection
                return registerCollection;
            },
//          TODO: make this work
            getRegisterEntitiesPromises: function() {
                App.log('register:entities event detected', contextName, 1);
                var registerCollection = new Entities.RegisterCollection();
                var defer = $.Deferred();
                registerCollection.fetch({
                    complete: function() {
                        defer.resolve(registerCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(registerCollection) {
                    // check to see if it had content:
                    if (registerCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each register to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            registerCollection.reset(initializeRegisters().models); // update the collection
                        }, 2000);

                    }
                });
                return promise;
            },

        };

        App.reqres.setHandler('register:entities', function() {
            return API.getRegisterEntities();
        });

        // App.reqres.setHandler('register:entity', function(id) {
        // return API.getRegisterEntity(id);
        // });

        App.reqres.setHandler('images:entity:new', function(id) {
            App.log('Making new image: ' + id, this.name, 1);
            return new Entities.Register();
        });
    });

    return;
});