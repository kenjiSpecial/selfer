define([
    'backbone'
    ],

    function(Backbone){
        var ImageDataCollection = Backbone.Collection.extend({
        });

        var imageDataCollection = new ImageDataCollection();

        return imageDataCollection;
    }
);