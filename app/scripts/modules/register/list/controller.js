'use strict';
define(['app', 'list/view'], function(App, View) {
    App.module('RegisterApp.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listRegister: function() {
                require(['common/views', 'register_entity'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingRegister = App.request('register:entities');

                    var registerListLayout = new View.Layout();
                    // var registerListPanel = new View.Panel();

                    $.when(fetchingRegister).done(function(register) {
                        // App.log('Fetched register data', 'App', 1);

                        var registerListView = new View.Register({
                            collection: register
                        });

                        // registerListLayout.on('show', function() {
                        //   registerListLayout.panelRegion.show(registersListPanel);
                        //   registerListLayout.registerRegion.show(registerListView);
                        // });

                        // registerListView.on('itemview:register:show', function(childView, model) {
                        //   App.trigger('register:show', model.get('id'));
                        // });

                        registerListView.on('itemview:register:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        registerListLayout.registerRegion.show(registerListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(registerListLayout);

                });
            }
        };
    });
    return App.RegisterApp.List.Controller;
});