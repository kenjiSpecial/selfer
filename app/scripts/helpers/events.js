define([
    'backbone'
], function( Backbone ) {
    var event = _.extend({}, Backbone.Events);

    _.extend(event, {
        PARSE_LOAD  : ".parse_load_done",
        TIMER_START : ".timer-start"
    });

    return event;
});