/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'collections/projectCollection',
    'helpers/events'
], function ($, _, Backbone, moment, projectCollection, myEvent ) {
    'use strict';

    var TimerView = Backbone.View.extend({
        el                      : "#main-container",
        $timer                  : null,
        timerLoopHandlerAction  : null,
        timerLoopStatus         : false,

        today                   : null,
        objectId                : null,
        name                    : null,

        timerValue              : 0,

        initialize: function(){
            console.log("timer view initialize");
            //this.timerStartHandlerAction = _.bind( this.timerStartHandler, this );
            //myEvent.on(myEvent.TIMER_START, this.timerStartHandlerAction);
            this.timerLoopHandlerAction = _.bind( this.timerLoopHandler, this);
        },

        timerStartAction : function( objectId, name){
            //projectCollection.getObject(_objectId);
            this.timerValue      = 0;
            this.timerLoopStatus = true;

            this.objectId = objectId;
            this.name     = name;

            this.today = new Date().getTime();

            var $projectName = this.$el.find("#timer .title");
            $projectName.html(name);

            var $date = this.$el.find("#timer .date")
            $date.html(moment().format("MMM D YYYY"));


            this.$timer = this.$el.find("#timer");
            this.$timer.removeClass("inactive").addClass("active");

            /// timer start
            this.$hourAndMinutes = this.$el.find("#timer .hour");
            this.$seconds        = this.$el.find("#timer .second");
            this.timerLoopHandler();
        },

        timerLoopHandler : function(){
            //this.timerValue += 1;
            this.timerValue += 1000;
            var duration = moment.duration( this.timerValue, 'milliseconds');

            var seconds = duration.seconds(),
                minutes = duration.minutes(),
                hours   = duration.hours();

            var secondString = seconds < 10 ? "0" + seconds : seconds;
            var minuteString = minutes < 10 ? "0" + minutes : minutes;
            var hourString   = hours   < 10 ? "0" + hours : hours;

            // moment
            this.$hourAndMinutes.html(hourString + " : " + minuteString);
            this.$seconds.html(secondString);

            if(this.timerLoopStatus) setTimeout(this.timerLoopHandlerAction, 1000);
        }



    });

    var timerView = new TimerView();
    return timerView;
});