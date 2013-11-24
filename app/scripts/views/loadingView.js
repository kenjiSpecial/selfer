/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',

    'views/loaderView',

    'models/appData',

    'collections/imageDataCollection',
    'collections/projectCollection',

    'helpers/events',

    'templates',
    'preloadJS'
], function ($, _, Backbone, loaderView, appData, imageData, projectCollection, myEvent, JST) {
    'use strict';

    var LoadingView = Backbone.View.extend({
        el                 : "#loader",
        $loadText          : null,
        blinkingHandler    : null,
        loadingStatus      : false,
        leastTimer         : false,
        leastTimerDuration : 4000,
        count              : 0,

        initialize : function(){
            this.$el.removeClass("invisible").addClass("visible");

            myEvent.on( myEvent.PARSE_LOAD, _.bind(this.parseLoadDone, this) );
        },

        render: function ( ) {
            var self = this;
            this.$loadText = this.$el.find("#loading-text");

            this.$el.removeClass("login").addClass("loading");


            this.loadingStatus = true;
            this.blinkingHandler = _.bind(this.blinkAction, this);


            setTimeout(function(){
                self.$loadText.removeClass("invisible").addClass("visible");
                self.blinkAction();
            }, 1000);

            setTimeout(function(){
                self.leastTimer = true;

                if(!self.loadingStatus && self.leastTimer){
                    self.loadingFinish();
                }

            }, 2000);

            // start to load the data.
            projectCollection.fetchStart();

        },

        blinkAction : function( ) {
            switch( this.count % 3 ) {
                case 0:
                    this.$loadText.text("Loading.");
                    break;
                case 1:
                    this.$loadText.text("Loading..");
                    break;
                case 2:
                    this.$loadText.text("Loading...");
                    break;
            }

            this.count++;

            if(this.loadingStatus || !this.leastTimer)
                setTimeout(this.blinkingHandler, 300);
        },

        parseLoadDone : function(){
            var thumbnails = [];
            // start to load image.
            var projectCollectionJson = projectCollection.getJson();

            for(var i = 0; i < projectCollectionJson.length; i++){
                var thumbnailName = projectCollectionJson[i].thubmnailFileName;
                if( thumbnailName == "null" ) thumbnailName = "null-thumbnail.jpg";
                var id            = projectCollectionJson[i].id;

                var src = {src: thumbnailName, id: id };
                thumbnails.push(src);
            }

            var preload = new createjs.LoadQueue(true, "images/");
            preload.addEventListener("fileload", _.bind( this.fileLoadHandler, this ));
            preload.addEventListener("complete", _.bind( this.completeHandler, this ) );
            preload.loadManifest(thumbnails);


        },

        fileLoadHandler : function(event){
            // at least  5seconds animation.
            var idName     = event.item.id;
            var result = event.result;
            imageData.add({ id: idName, img: result });
        },

        completeHandler : function(event){

            // -> loadStatus
            this.loadingStatus = false;

            if(!this.loadingStatus && this.leastTimer){
                this.loadingFinish();
            }

        },


        loadingFinish : function(){

            this.$el.find("#loading-text").removeClass("visible").addClass("invisible");
            appData.set("load", true);
            myEvent.trigger(myEvent.LOADING_FINISH);
        }


    });

    var loadingView = new LoadingView();

    return loadingView;
});