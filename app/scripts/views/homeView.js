/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/loaderView',
    'views/timerView',
    'models/appData',
    'collections/projectCollection',
    'templates'
], function ($, _, Backbone, moment, loaderView, timerView, appData, projectCollection, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template             : JST['app/scripts/templates/homeTemplate.ejs'],
        el                   : "#main-container",
        $home                : null,
        timer                : null,

        workMouseEnterAction : null,
        workMouseLeaveAction : null,

        doingMainData        : null,
        doingSubData         : null,
        didMainData          : null,
        didSubData           : null,

        events : {
            "click .start-button" : "startTimerHandler",
            "click .stop-bt"  : "stopTimerHandler"
        } ,

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

            var currentYear = moment();
            var lastOneYear = moment().subtract( 'years', 1 );
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
                                        currentYear   : moment().year(),
                                        currentMonth  : moment().month(),
                                        doingMainData : this.doingMainData,
                                        doingSubData  : this.doingSubData,
                                        didMainData   : this.didMainData,
                                        didSubData    : this.didSubData
                                    });
            this.$el.html(html);

            // setting css
            this.$timeline = this.$el.find("#timeline");
            this.$timeline.css("height", 1600);

            // set the work position properly.
            var i;
            var objectId, endDate, month, $workString, $work, topPos;
            var $circleString, $circle, $rectString, $rect;

            for( i = 0; i < this.didMainData.length; i++ ) {
                objectId = this.didMainData[i].objectId;
                endDate  = this.didMainData[i].endDate;
                month    = currentYear.diff( endDate, 'months' );
                $workString   = "#work-" + objectId;
                $circleString = "#circle-" + objectId;

                $work       = this.$el.find( $workString );
                $circle     = this.$el.find( $circleString );

                topPos   = 300 + 100 * month;

                $work.css({
                    top: topPos
                });

                $circle.css({
                    top: (topPos -12)
                });
            }

            for( i = 0; i < this.didSubData.length; i++ ) {
                objectId = this.didSubData[i].objectId;
                endDate  = this.didSubData[i].endDate;
                month    = currentYear.diff( endDate, 'months' );
                $workString = "#work-" + objectId;
                $rectString = "#rect-" + objectId;
                $work       = this.$el.find( $workString );
                $rect       = this.$el.find( $rectString );
                topPos   = 300 + 100 * month;

                $work.css({
                    top: topPos
                });

                $rect.css({
                    top: (topPos -12)
                });
            }


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
        },

        startTimerHandler : function(event){

            var $startButton = this.$el.find(".start-button");
            $startButton.addClass("invisible");

            var $stopButton = this.$el.find(".stop-bt");
            $stopButton.removeClass("invisible").removeClass("display-none");

            setTimeout(function(){
                $startButton.addClass("display-none");
            }, 500);

            var name = $(event.target).parent().parent().find(".title").html();

            timerView.timerStartAction($(event.target).attr("href"), name);

            this.$timeline.addClass("timer-active");



            event.preventDefault();
        },

        stopTimerHandler : function(event){
            event.preventDefault();
            var $target = $(event.target);

            $target.addClass("invisible");

            setTimeout(function(){
                //$target.addClass("display-none");
            }, 300)

        }

    });

    return HomeView;
});