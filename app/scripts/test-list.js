/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        isotope : {
            deps: ['jquery']
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        isotope : '../bower_components/isotope/jquery.isotope',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        preloadJS : '../bower_components/PreloadJS/lib/preloadjs-0.4.0.min',
        moment  : '../bower_components/momentjs/moment',
        tweenLite : '../bower_components/tweenLite/TweenMax'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',

    'models/appData',

    'collections/projectCollection',

    'views/createView',


    'helpers/events',
    'helpers/modernizr',

], function ( $, _, Backbone, appData, projectCollection, ListView, myEvent ) {
    Parse.initialize("7XMOsP7DvvTF3EbAaXj43FSZHAjv2Zl9YSz5N99b", "ja43CiuOaMm5hwCp0iPb7EXquKYbsTdK3Wfsj8qk");

    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            '*actions'     : 'defaultAction'
        },

        initialize : function(){
            _.bindAll(this, 'parseLoadDone');
        },

        defaultAction : function(){
            projectCollection.fetchStart();

            myEvent.on( myEvent.PARSE_LOAD, this.parseLoadDone );
        },

        parseLoadDone : function(){
            appData.set("load", true);

            var listView = new ListView();
            listView.render();

            $("#main-container").removeClass("initVisible");
        }
    });

    var app = new ApplicationRouter();

    Backbone.history.start();

});
