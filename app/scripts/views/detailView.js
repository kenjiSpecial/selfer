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
        addStepClass : null,


        events : {
            "click li.detail-nav" : "changeViewAction"
        },

        initialize : function(){
        },

        render : function(){
            this.$el.removeClass("not-active");

            var html = this.template();
            this.$el.html(html);
        },

        changeViewAction : function(event){
            var prevNumber = this.currentSelectNumber;
            this.currentSelectNumber = this.$el.find("li").index(event.target);

            var dx = Math.abs(prevNumber - this.currentSelectNumber);
            if(dx == 0) return;

            this.$el.find("li").eq(prevNumber).removeClass("select");
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

            var prevStepClass = this.addStepClass;

            if(dx == 1){
                this.addStepClass = "step1";
            }else if(dx == 2){
                this.addStepClass = "step2";
            }

            var $wrapper = this.$el.find(".wrapper");

            if(prevStepClass){
                $wrapper.removeClass(prevStepClass).addClass(this.addStepClass);
            }else{
                $wrapper.addClass(this.addStepClass);
            }



            $wrapper.removeClass(prevClass).addClass(curClass);
        }

    });

    var detailView = new DetailView();

    return detailView;
});