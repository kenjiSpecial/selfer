define([
    'backbone'
], function( Backbone ) {
    var event = _.extend({}, Backbone.Events);

    _.extend(event, {
        LOGIN_DONE       : ".loginDone",
        LOADING_FINISH   : ".loadingFinish",
        PARSE_LOAD       : ".parse_load_done",
        TIMER_START      : ".timer-start",
        TIMER_RESET      : ".timer-reset",
        RESIZE           : ".resize",
        VIEW_RENDER_DONE : '.list-view-render-done'
    });

    return event;
});