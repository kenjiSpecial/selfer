/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/appData',

    'helpers/events',
    'helpers/constants'


], function ($, _, Backbone, JST, appData, Events, constants ) {
    'use strict';

    var ListView = Backbone.View.extend({
        template: JST['app/scripts/templates/listTemplate.ejs'],
        el      : "#main-container",

        initialize : function(){
            _.bindAll(
                this,
                'renderView'
            );
        },

        render   : function(){
            if(!appData.get("load")){
                return;
            }
            //console.log()
            this.html = this.template();

            //startToRender
            setTimeout(this.renderView, constants.VIEW_DURATION);
        },

        renderView : function(){
            this.$el.html(this.html);

            Events.trigger(Events.VIEW_RENDER_DONE);


        }


    });

    return ListView;
});