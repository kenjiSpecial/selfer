/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/loaderView',
    'models/appData',
    'collections/projectCollection',
    'templates'
], function ($, _, Backbone, moment, loaderView, appData, projectCollection, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template             : JST['app/scripts/templates/homeTemplate.ejs'],
        el                   : "#main-container",
        $home                : null,

        workMouseEnterAction : null,
        workMouseLeaveAction : null,

        doingMainData        : null,
        doingSubData         : null,
        didMainData          : null,
        didSubData           : null,

        render: function () {
            if(!appData.get("load")){
                return;
            }
            var json = projectCollection.getJson();

            // initialize the variables
            this.doingMainData    = null;
            this.doingSubData     = null;
            this.didMainData      = [];
            this.didSubData       = [];

            var lastOneYear = moment().subtract( 'years', 1 );
            // console.log(lastOneYear);
            // console.log(json);

            for(var i in json){
                var status = json[i].status;
                var type   = json[i].type;

                if(status == "doing"){

                    switch (type){
                        case "main":
                            this.doingMainData = json[i];
                            break;
                        case "sub":
                            this.doingSubData  = json[i];
                            break;
                    }

                } else if(status == "done") {

                    if(moment(lastOneYear).isBefore(json[i].endDate)){

                        switch (type){
                            case "main":
                                this.didMainData.push(json[i]);
                                break;
                            case "sub":
                                this.didSubData.push(json[i]);
                                break;
                        }

                    }
                }
            }


            this.$el.addClass("initVisible").removeClass("init");

            var html = this.template({
                                        doingMainData : this.doingMainData,
                                        doingSubData  : this.doingSubData,
                                        didMainData   : this.didMainData,
                                        didSubData    : this.didSubData
                                    });
            this.$el.html(html);

            // setting css
            this.$timeline = this.$el.find("#timeline");
            this.$timeline.css("height", 1600);

            this.removeLoginHandler();

            // bind the method
            this.workMouseEnterAction = _.bind(this.workMouseEnter, this);
            this.workMouseLeaveAction = _.bind(this.workMouseLeave, this);

            // method on
            this.$el.on("mouseenter", ".work", this.workMouseEnterAction);
            this.$el.on("mouseleave", ".work", this.workMouseLeaveAction);



        },

        removeLoginHandler : function(){

            if (this.$el.hasClass("initVisible")) {
                var self = this;

                loaderView.loginStart();

                setTimeout( function( ){
                    self.$el.removeClass("initVisible").addClass("init");
                }, 250);

            }
        },

        remove: function(){
            this.$el.html("");

            this.$el.off("mouseenter", ".work");
            this.$el.off("mouseleave", ".work");
        },

        workMouseEnter : function(event) {
            var $target            = $(event.target);
            var $targetParent      = $target.parent();
            var $targetGrandParent = $targetParent.parent();

            if($target.hasClass("work")){
                $target.addClass("work-mouse-enter");
            }else if($targetParent.hasClass("work")){
                $targetParent.addClass("work-mouse-enter");
            }else if($targetGrandParent.hasClass("work")){
                $targetGrandParent.addClass("work-mouse-enter");
            }
        },

        workMouseLeave : function(event) {
            var $target            = $(event.target);
            var $targetParent      = $target.parent();
            var $targetGrandParent = $targetParent.parent();
            var $targetSuperParent = $targetGrandParent.parent();

            if($target.hasClass("work-mouse-enter")){
                $target.removeClass("work-mouse-enter");
            }else if($targetParent.hasClass("work-mouse-enter")){
                $targetParent.removeClass("work-mouse-enter");
            }else if($targetGrandParent.hasClass("work-mouse-enter")){
                $targetGrandParent.removeClass("work-mouse-enter");
            }else if($targetSuperParent.hasClass("work-mouse-enter")){
                $targetSuperParent.removeClass("work-mouse-enter");
            }
        }

    });

    return HomeView;
});