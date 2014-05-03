'use strict';
define(['app'], function(App) {
    App.module('RegisterApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        var contextName = 'RegisterApp.List.View';
        View.Layout = Marionette.Layout.extend({
            template: 'register_layout',

            regions: {
                panelRegion: '#panel-region',
                registerRegion: '#content'
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            }
        });

        // View.Panel = Marionette.ItemView.extend({
        //     template: panelTpl,

        //     triggers: {
        //         'click button.js-new': 'register:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterRegisters'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterRegisters: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('registers:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.RegisterOne = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'register_list_one',

            events: {
                'click': 'highlightName',
                'click td a.js-show': 'showClicked',
                'click button.js-delete': 'deleteClicked'
            },

            highlightName: function() {
                this.$el.toggleClass('warning');
            },

            showClicked: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('register:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('register:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var RegisterEmpty = Marionette.ItemView.extend({
            template: 'register_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Register = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'register_list',
            emptyView: RegisterEmpty,
            itemView: View.RegisterOne,
            itemViewContainer: '.register_list',

            initialize: function() {
                App.log('init called', contextName, 1);
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', contextName, 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                App.log('rendered called', 'register list view', 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return App.RegisterApp.List.View;
});