/*global define*/

define([
    'underscore',
    'backbone',
    'models/project',
    'helpers/events'
], function ( _, Backbone, project, myEvent ) {
    'use strict';

    var ProjectCollection = Parse.Collection.extend({

        model       : project,

        fetchStatus : null,
        query       : null,

        fetchStart: function(){
            var query = new Parse.Query(this.model);
            query.equalTo("user", Parse.User.current());

            this.query = query;

            var self = this;

            this.fetch(

                {
                    success: function(){
                        self.fetchStatus = true;
                        myEvent.trigger(myEvent.PARSE_LOAD);
                    }
                }
            )
        },

        getJson: function(){
            return this.toJSON();
        }
    });

    var projectCollection = new ProjectCollection();
    return projectCollection;
});