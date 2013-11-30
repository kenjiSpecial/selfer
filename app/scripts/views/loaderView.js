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
        $clock  : null,

        initialize : function(){
            this.$clock = this.$el.find(".clock");
        },

        show: function( ) {
            this.$el.addClass("load");
        },

        hide : function( ) {
            this.$el.removeClass("load");
        },

        loginStart: function( ) {
            var self = this;
            this.$el.addClass("login-start");

            setTimeout(function(){
                self.$el.removeClass("login-start");
                self.$el.removeClass("slow").addClass("fast");
                self.$el.removeClass("loading");
            }, 1000);
        },


        reset : function( ) {
            if( this.$el.hasClass("load") )
                this.$el.removeClass("load");

            if( this.$el.hasClass("login") )
                this.$el.removeClass("login");

            if( this.$el.hasClass("login-start") )
                this.$el.removeClass("login-start");

            if( this.$clock.hasClass("loadDone") )
                this.$clock.removeClass("loadDone");

        },

        fadeOut: function(){
            this.$clock.addClass("loadDone");
        }


    });

    var loaderView = new LoaderView()

    return loaderView;
});