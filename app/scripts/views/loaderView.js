/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LoaderView = Backbone.View.extend({
        el      : "#loader",

        show: function( ) {
            this.$el.addClass("load");
        },

        hide : function( ) {
            this.$el.removeClass("load");
        },

        loginStart: function( ) {
            this.$el.addClass("login-start");
        },


        reset : function( ) {
            if( this.$el.hasClass("load") )
                this.$el.removeClass("load");

            if( this.$el.hasClass("login") )
                this.$el.removeClass("login");

            if( this.$el.hasClass("login-start") )
                this.$el.removeClass("login-start");
        }


    });

    var loaderView = new LoaderView()

    return loaderView;
});