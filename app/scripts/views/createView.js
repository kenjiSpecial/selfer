/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/appData',

    'helpers/events',
    'helpers/constants'

], function ( $, _, Backbone, JST, appData, Events, constants ) {
    'use strict';

    var CreateView = Backbone.View.extend({
        template : JST['app/scripts/templates/createTemplate.ejs'],
        el       : "#main-container",
        events   : {
            "click #create-page .image-nav li": "onImageChange"
        },

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

            this.html = this.template();

            //startToRender
            setTimeout(this.renderView, constants.VIEW_DURATION);
        },

        renderView : function(){
            this.$el.html(this.html);

            Events.trigger(Events.VIEW_RENDER_DONE);
        },

        onImageChange : function(event){
            var $lis = this.$el.find(".image-nav li");
            $lis.removeClass("selected");
            $(event.target).addClass("selected");

            var indexNumber = $lis.index(event.target);
            var selectClass = "select" + indexNumber;


            selectClass = selectClass + " image-gallery";
            console.log(selectClass)
            this.$el.find(".image-gallery").attr("class", selectClass);

            return false;
        }

    });

    return CreateView;
});