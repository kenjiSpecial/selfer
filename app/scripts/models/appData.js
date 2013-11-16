/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AppDataModel = Backbone.Model.extend({
        defaults: {
            "load" : false
        }
    });


    return new AppDataModel();
});