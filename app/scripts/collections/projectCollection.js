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

        selectID    : null,

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
        },

        getObject: function( objectID ){
            this.query.equalTo("objectId", objectID)

            this.query.find({
                success: function(results) {
                    var name;
                    for(var i in results){
                        name = results[i].get("name");
                    }

                    console.log("name: ", name);

                    myEvent.trigger(myEvent.TIMER_START, name);

                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });

        }
    });

    var projectCollection = new ProjectCollection();
    return projectCollection;
});