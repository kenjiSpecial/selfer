/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/projectCollection',
    'helpers/events',
    'helpers/windowHelper',
    'tweenLite'
], function ($, _, Backbone, JST, projectCollection, Events, windowHelper ) {
    'use strict';

    var DetailView = Backbone.View.extend({
        el : "#detail",
        currentSelectNumber : 0,
        template: JST['app/scripts/templates/detailTemplate.ejs'],
        addStepClass : null,


        events : {
            "click li.detail-nav"   : "changeViewAction",
            "click #detail-remove"  : "removeViewAction"
        },

        initialize : function(){
            _.bindAll(
                this,
                'onResize',
                'querySuccess'
            );
        },

        render : function(id){
            $('body').addClass("fix-window");

            this.onResize();
            Events.on( Events.RESIZE, this.onResize);

            projectCollection.query.equalTo("objectId", id);
            projectCollection.query.first({
                success: this.querySuccess,
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            })


            //TweenLite.to(this.el, 1, { css: { width: window.innerWidth } } );

            this.$el.removeClass("invisible").addClass("visible");

            var self = this;
            setTimeout(function(){
                self.$el.addClass("visible-active");


            }, 10);



        },

        querySuccess : function(data){
            var data = data.toJSON();
            var $detailMainContent = this.$el.find("#detail-main-content");

            var html = this.template({ data: data });
            $detailMainContent.html(html);

            $detailMainContent.addClass("data-read");

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
        },

        removeViewAction: function(event){
            Events.off( Events.RESIZE);

            $('body').removeClass("fix-window");

            this.$el.addClass("remove-active");

            var self = this;

            setTimeout(function(){
                self.$el.removeClass("visible visible-active remove-active");
                self.$el.addClass("invisible")
            }, 2000);

        },

        onResize : function(){
            this.$el.css({
                width: windowHelper.width,
                height: windowHelper.height
            });
        }

    });

    var detailView = new DetailView();

    return detailView;
});