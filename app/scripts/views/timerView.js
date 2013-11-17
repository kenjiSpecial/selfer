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

        timerStartAction : function(){
            this.$timer = this.$el.find("#timer");
            this.$timer.removeClass("inactive").addClass("active");
        }

    });

    var timerView = new TimerView();
    return timerView;
});