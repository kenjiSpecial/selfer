/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'helpers/events',
    'views/loaderView'

], function ($, _, Backbone, Events, loaderView) {
    'use strict';

    var NavView = Backbone.View.extend({
        el           : "#side-menu",
        trigger      : null,
        $trigger     : null,
        $loader      : null,
        loadingState : false,

        events   : {
            "click a.bt-menu-trigger" : "clickHandler",
            "click a.bt-icon"         : "iconHandler"
        },

        initialize: function(){
            _.bindAll(
                this,
                "loadDoneHandler"
            );

            this.$loader = $("#loader");

            this.trigger     = this.el.querySelector("a.bt-menu-trigger");
            this.$trigger    = $(this.trigger);

            var overlay = document.createElement("div");
            $(overlay).addClass("bt-overlay");
            this.$el.append(overlay);

            Events.on( Events.VIEW_RENDER_DONE, this.loadDoneHandler );

        },

        render       : function(){

        },

        clickHandler : function( event ) {
            event.stopPropagation();
            event.preventDefault();

            if(this.loadingState){
                return;
            }

            loaderView.reset();

            if(this.$el.hasClass('bt-menu-open')) {
                this.$el.removeClass("bt-menu-open").addClass("bt-menu-close");
            } else {
                this.$el.removeClass("bt-menu-close").addClass("bt-menu-open");
            }
        },

        iconHandler : function(event) {
            loaderView.reset();

            var self = this;
            if(this.loadingState){
                event.preventDefault();
                return;
            }

            this.loadingState = true;

            this.$el.addClass("loading");
            this.$loader.addClass("load");


            var $activeIcon = this.$el.find(".active");
            $activeIcon.removeClass("active");

            $(event.target).addClass("active");

        },

        loadDoneHandler : function(){
            this.loadingState = false;

            loaderView.fadeOut();
            //this.$loader.removeClass("load");
            this.$el.removeClass("loading");


        }


    });

    var navView = new NavView();

    return navView;
});