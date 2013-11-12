/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/loaderView',
    'templates'
], function ($, _, Backbone, loaderView, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/homeTemplate.ejs'],
        el: "#main-container",

        render: function () {

            var html = this.template();
            this.$el.html(html);

            if (this.$el.hasClass("init")) {
                this.$el.removeClass("init");

                loaderView.loginStart();

            }

        }

    });

    return HomeView;
});