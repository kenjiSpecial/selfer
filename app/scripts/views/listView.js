/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'isotope',
    'moment',
    'templates',

    'models/appData',

    'views/detailView',

    'collections/projectCollection',

    'helpers/events',
    'helpers/constants'


], function ($, _, Backbone, isotope, moment, JST, appData, detailView, projectCollection, Events, constants ) {
    'use strict';

    var ListView = Backbone.View.extend({
        template: JST['app/scripts/templates/listTemplate.ejs'],
        el      : "#main-container",
        filterType   : "*",
        filterStatus : "*",

        events  : {
            "click #list-page ul.type li a" : "onClickType",
            "click #list-page ul.status li a" : "onClickStatus",
            "click #list-page .button" : "onClickDetail",
            "mouseenter  #list-page .project" : "onMouseEnterIntoProject",
            "mouseleave  #list-page .project" : "onMouseLeaveIntoProject"
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
            //console.log()
            this.html = this.template({
                allData : projectCollection.toJSON()
            });

            //startToRender
            setTimeout(this.renderView, constants.VIEW_DURATION);
        },

        renderView : function(){
            this.$el.html(this.html);
            $("#contentWrapper").isotope({ filter: "*" });


            Events.trigger(Events.VIEW_RENDER_DONE);
        },

        onClickType : function(event){
            var $target = $(event.target);

            this.$el.find("ul.type a").removeClass('select');
            $target.addClass('select');

            this.filterType = $target.attr("data-filter");
            this.filtering();

            return false;
        },

        onClickStatus : function(event){
            var $target = $(event.target);

            this.$el.find("ul.status a").removeClass('select');
            $target.addClass('select');

            this.filterStatus = $target.attr("data-filter");
            this.filtering();

            return false;
        },

        onClickDetail : function(event){
            var objectId = $(event.target).attr("object-id");
            detailView.render(objectId);
        },


        filtering : function(){

            var filterString = this.filterType.concat(this.filterStatus);

            if(filterString == "**"){
                filterString = "*";
            }

            $("#contentWrapper").isotope({ filter: filterString });
        },

        onMouseEnterIntoProject : function(event){
            var $target            = $(event.target);
            var $targetParent      = $target.parent();
            var $targetGrandParent = $targetParent.parent();
            var $targetSuperParent = $targetGrandParent.parent();

            if($target.hasClass("inactive")){
                $target.removeClass("inactive").addClass("active");
            }else if($targetParent.hasClass("inactive")){
                $targetParent.removeClass("inactive").addClass("active");
            }else if($targetGrandParent.hasClass("inactive")){
                $targetGrandParent.removeClass("inactive").addClass("active");
            }else if($targetSuperParent.hasClass("inactive")){
                $targetSuperParent.removeClass("inactive").addClass("active");
            }
        },

        onMouseLeaveIntoProject : function(event){
            var $target            = $(event.target);
            var $targetParent      = $target.parent();
            var $targetGrandParent = $targetParent.parent();
            var $targetSuperParent = $targetGrandParent.parent();

            if($target.hasClass("active")){
                $target.removeClass("active").addClass("inactive");
            }else if($targetParent.hasClass("active")){
                $targetParent.removeClass("active").addClass("inactive");
            }else if($targetGrandParent.hasClass("active")){
                $targetGrandParent.removeClass("active").addClass("inactive");
            }else if($targetSuperParent.hasClass("active")){
                $targetSuperParent.removeClass("active").addClass("inactive");
            }
        }

    });

    return ListView;
});