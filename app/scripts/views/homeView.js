/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/loaderView',
    'collections/projectCollection',
    'templates'
], function ($, _, Backbone, loaderView, projectCollection, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template             : JST['app/scripts/templates/homeTemplate.ejs'],
        el                   : "#main-container",
        $home                : null,

        workMouseEnterAction : null,
        workMouseLeaveAction : null,

        render: function () {
            var json = projectCollection.getJson();

            this.$el.addClass("initVisible").removeClass("init");


            var html = this.template();
            this.$el.html(html);

            // setting css
            this.$timeline = this.$el.find("#timeline");
            this.$timeline.css("height", 1500);

            this.removeLoginHandler();

            // bind the method
            this.workMouseEnterAction = _.bind(this.workMouseEnter, this);
            this.workMouseLeaveAction = _.bind(this.workMouseLeave, this);

            // method on
            this.$el.on("mouseenter", ".work", this.workMouseEnterAction);
            this.$el.on("mouseleave", ".work", this.workMouseLeaveAction);



        },

        removeLoginHandler : function(){

            if (this.$el.hasClass("initVisible")) {
                var self = this;

                setTimeout( function( ){
                    self.$el.removeClass("initVisible").addClass("init");
                }, 1000);

                setTimeout(function(){
                    loaderView.loginStart();
                }, 3000);

            }
        },

        remove: function(){
            this.$el.html("");

            this.$el.off("mouseenter", ".work");
            this.$el.off("mouseleave", ".work");
        },

        workMouseEnter : function(event) {
            console.log("work mouse enter");
        },

        workMouseLeave : function(event) {
            console.log("work mouse leave");
        }

    });

    return HomeView;
});