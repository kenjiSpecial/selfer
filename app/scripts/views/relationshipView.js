/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var RelationshipView = Backbone.View.extend({
        template: JST['app/scripts/templates/relationshipTemplate.ejs'],
        el      : "#main-container",

        render   : function(){
            var html = this.template();

            this.$el.html(html);

        }


    });

    return RelationshipView;
});