define([
    'jquery',
    'underscore',
    'backbone',
    'helpers/events'
], function( $, _, Backbone, Events ){
    var WindowHelper = function(){
        _.bindAll(this,
            'onWindowResize'
        );

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        $(window).resize( this.onWindowResize );
    }

    WindowHelper.prototype = {
        width: null,
        height: null,
        onWindowResize : function(e){
            this.width = window.innerWidth;
            this.height = window.innerHeight;


            Events.trigger(Events.RESIZE);
        }
    }



    var windowHelper = new WindowHelper();
    return windowHelper;
});