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

        currentTimerObjectId    : null,
        currentTimerObjectModel : null,
        currentTimerObjectJson  : null,

        timerValue              : 0,

        events : {
            "click .stop-bt"  : "stopTimerHandler"
        } ,

        initialize: function(){
            this.timerLoopHandlerAction = _.bind( this.timerLoopHandler, this);
        },

        timerStartAction : function( objectId, name){
            this.currentTimerObjectId    = objectId;
            this.currentTimerObjectModel = projectCollection.get(this.currentTimerObjectId);
            this.currentTimerObjectJson  = this.currentTimerObjectModel.toJSON();

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

            if(!this.timerLoopStatus) return;

            this.timerValue += 1;

            var timerList = this.parseTime(this.timerValue);

            // moment
            this.$hourAndMinutes.html(timerList.hour);
            this.$seconds.html(timerList.second);

            setTimeout(this.timerLoopHandlerAction, 1000);
        },

        stopTimerHandler : function(){

            event.preventDefault();

            if(!this.timerLoopStatus) return;

            this.timerLoopStatus = false;

            var $stopButton = this.$el.find(".stop-bt");
            $stopButton.addClass('saving');

            var self = this;
            var didLog = {date: moment().format("MM/DD/YYYY"), second: this.timerValue};
            console.log(didLog);
            this.currentTimerObjectModel.addUnique("did", didLog).save({
                success : function(){
                    self.timerSaveDone();
                }
            });
        },

        timerSaveDone : function(){


            var todaySum = 0,
                weekSum  = 0,
                monthSum = 0,
                totalSum = 0;

            var current      = moment();
            var currentWeek  = current.week();
            var currentMonth = current.month();
            var currentDate = current.format("MM/DD/YYYY");

            this.currentTimerObjectJson  = this.currentTimerObjectModel.toJSON();

            var didLog =  this.currentTimerObjectJson.did;

            if(didLog){

                for(var i = 0; i < didLog.length; i++){
                    var object       = didLog[i];
                    var projectDate  = moment(object.date);
                    var projectWeek  = projectDate.week();
                    var projectMonth = projectDate.month();

                    var projectSecond = object.second;

                    // -----------
                    // --- sum ---
                    // -----------

                    totalSum += projectSecond;

                    if( moment(currentDate).isSame(object.date) ) todaySum += projectSecond;
                    if( currentWeek == projectWeek )              weekSum += projectSecond;
                    if( projectMonth == currentMonth )            monthSum += projectSecond;

                }

            }

            console.log( "T: " +  todaySum + " ,W: " + weekSum +  " M:  " + monthSum + " TOTAL: " + totalSum );
            var todayList = this.parseTime(todaySum);
            var weekList  = this.parseTime(weekSum);
            var monthList = this.parseTime(monthSum);
            var totalList = this.parseTime(totalSum);

            this.$el.find("#today-result-hour").text(todayList.hour);
            this.$el.find("#today-result-second").text(todayList.second);

            this.$el.find("#week-result-hour").text(weekList.hour);
            this.$el.find("#week-result-second").text(weekList.second);

            this.$el.find("#month-result-hour").text(monthList.hour);
            this.$el.find("#month-result-second").text(monthList.second);

            this.$el.find("#total-result-hour").text(totalList.hour);
            this.$el.find("#total-result-second").text(totalList.second);


            this.$el.find(".timer-button").addClass("timer-stop");

            this.timerValue = 0;

            var self = this;

            setTimeout(function(){
                self.$timer.removeClass("active").addClass("inactive");

                myEvent.trigger(myEvent.TIMER_RESET);

                self.$el.find(".stop-bt").removeClass('saving');
                self.$el.find(".timer-button").removeClass("timer-stop");

            }, 10000);
        },

        parseTime : function(second){

            var duration = moment.duration( second, 'seconds');

            var seconds = duration.seconds(),
                minutes = duration.minutes(),
                hours   = duration.hours();

            var secondString = seconds < 10 ? "0" + seconds : seconds;
            var minuteString = minutes < 10 ? "0" + minutes : minutes;
            var hourString   = hours   < 10 ? "0" + hours : hours;

            var string = { hour: hourString + " : " + minuteString, second: secondString };

            return string;
        }


    });

    var timerView = new TimerView();
    return timerView;
});