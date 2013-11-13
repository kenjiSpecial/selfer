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
        template : JST['app/scripts/templates/homeTemplate.ejs'],
        el       : "#main-container",
        $home    : null,

        render: function () {
            var json = projectCollection.getJson();

            var html = this.template();
            this.$el.html(html);

            // setting css
            this.$timeline = this.$el.find("#timeline");
            this.$timeline.css("height", 800);



            this.$home = this.$el.find("#home-page");
            console.log(this.$home);

            this.removeLoginHandler();
        },

        removeLoginHandler : function(){
            if (this.$el.hasClass("init")) {
                this.$el.removeClass("init");

                loaderView.loginStart();

            }
        }

    });

    return HomeView;
});