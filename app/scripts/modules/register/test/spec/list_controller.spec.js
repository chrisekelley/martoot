/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        '/list/controller',
    ],

    function(App) {

        var SOMEMODULE = new App.RegisterApp.List.Controller();

        describe('Examples collection', function() {

            it('should exist', function() {
                expect(SOMEMODULE).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);