/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'tweenLite'
], function ($, _, Backbone, JST) {
    'use strict';

    var DetailView = Backbone.View.extend({
        el : "#detail",
        currentSelectNumber : 0,
        template: JST['app/scripts/templates/detailTemplate.ejs'],
        addStepClass : null,


        events : {
            "click li.detail-nav" : "changeViewAction"
        },

        initialize : function(){
        },

        render : function(){
            this.$el.css({
                width: window.innerWidth,
                height: window.innerHeight
            });

            //TweenLite.to(this.el, 1, { css: { width: window.innerWidth } } );

            this.$el.removeClass("invisible").addClass("visible");

            var self = this;
            setTimeout(function(){
                self.$el.addClass("visible-active");
                self.$el.find("#detail-main-content").html(html);

            }, 10);

            var html = this.template();

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