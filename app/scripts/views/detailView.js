/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var DetailView = Backbone.View.extend({
        el : "#detail",
        currentSelectNumber : 0,
        template: JST['app/scripts/templates/application.ejs'],


        events : {
            "click li" : "changeViewAction"
        },

        initialize : function(){

        },

        render : function(){

        },

        changeViewAction : function(event){
            var prevNumber;
            prevNumber = this.currentSelectNumber;

            this.$el.find("li").eq(this.currentSelectNumber).removeClass("select");

            this.currentSelectNumber = this.$el.find("li").index(event.target);

            this.$el.find("li").eq(this.currentSelectNumber).addClass("select");

            var prevClass, curClass

            switch (prevNumber){
                case 0: prevClass = "select0"; break;
                case 1: prevClass = "select1"; break;
                case 2: prevClass = "select2"; break; break;
            }

            switch (this.currentSelectNumber){
                case 0: curClass = "select0"; break;
                case 1: curClass = "select1"; break;
                case 2: curClass = "select2"; break; break;
            }

            this.$el.find(".wrapper").removeClass(prevClass).addClass(curClass);
        }

    });

    var detailView = new DetailView();

    return detailView;
});