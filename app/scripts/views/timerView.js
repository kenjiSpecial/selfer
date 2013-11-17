/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone ) {
    'use strict';

    var TimerView = Backbone.View.extend({
        el         : "#main-container",
        $timer     : null,

        initialize : function(){
            this.$timer = this.$el.find("#timer");
        },

        timerStartAction : function(){
            var $timer = this.$el.find("#timer");
            $timer.removeClass("inactive").addClass("active");
        }

    });

    var timerView = new TimerView();
    return timerView;
});