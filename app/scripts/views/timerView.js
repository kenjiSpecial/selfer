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
        timerStartHandlerAction : null,

        today                   : null,
        objectId                : null,
        name                    : null,

        timerValue              : 0,

        initialize: function(){
            console.log("timer view initialize");
            //this.timerStartHandlerAction = _.bind( this.timerStartHandler, this );
            //myEvent.on(myEvent.TIMER_START, this.timerStartHandlerAction);
        },

        timerStartAction : function( objectId, name){
            //projectCollection.getObject(_objectId);
            this.timerValue = 0;

            this.objectId = objectId;
            this.name     = name;

            this.today = moment().format("MMM D YYYY");

            var $projectName = this.$el.find("#timer .title");
            $projectName.html(name);

            var $date = this.$el.find("#timer .date")
            $date.html(this.today);


            this.$timer = this.$el.find("#timer");
            this.$timer.removeClass("inactive").addClass("active");
        }

    });

    var timerView = new TimerView();
    return timerView;
});