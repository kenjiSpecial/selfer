/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ListView = Backbone.View.extend({
        template: JST['app/scripts/templates/listTemplate.ejs'],
        el      : "#main-container",

        render   : function(){
            console.log()
            //var html = this.template();

            //this.$el.html(html);
        }
    });

    return ListView;
});