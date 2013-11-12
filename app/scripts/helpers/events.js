define([
    'backbone'
], function( Backbone ) {
    var event = _.extend({}, Backbone.Events);
    event.PARSE_LOAD = ".parse_load_done";
    return event;
});