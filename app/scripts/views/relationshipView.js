/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/appData'
], function ($, _, Backbone, JST, appData) {
    'use strict';

    var RelationshipView = Backbone.View.extend({
        template: JST['app/scripts/templates/relationshipTemplate.ejs'],
        el      : "#main-container",

        render   : function(){
            if(!appData.get("load")){
                return;
            }

            var html = this.template();

            this.$el.html(html);

        }


    });

    return RelationshipView;
});