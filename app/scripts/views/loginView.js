/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',

    'views/loaderView',

    'helpers/events',

    'templates'
], function ($, _, Backbone, loaderView, myEvent, JST) {
    'use strict';



    var LoginView = Backbone.View.extend({
        template: JST['app/scripts/templates/loginTemplate.ejs'],
        el      : "#main-container",
        success : false,
        events : {
            "click input[type='submit']" : "loginAction"
        },

        render   : function(){
            //setTimeout( this.loginStart,300);

            var html = this.template();
            this.$el.html(html);

            var windowHeight = window.innerHeight;
            var $mainContainer = $("#main-container");
            var marginTop = ( windowHeight - $mainContainer.height() )/2 - 40;

            this.$el.find("#login").css({"marginTop": marginTop});

            if(this.$el.hasClass("initVisible")) this.$el.removeClass("initVisible").addClass("init");

            this.windowResizeHandler = _.bind(this.resizeHandler, this);

            $(window).on( "resize", this.windowResizeHandler);
        },


        loginAction : function( event ) {
            var self = this,
                $nameForm = this.$el.find("input[name='name']"),
                $pwdForm  = this.$el.find("input[name='pwd']");

            var name = $nameForm.val();
            var pwd  = $pwdForm.val();




            if(name != "" && name != "" && !this.success){
                Parse.User.logIn(name, pwd, {
                    success: function(){
                        self.success = true;

                        $(window).off( "resize", this.windowResizeHandler);

                        $("#loader").removeClass("login-start")
                        self.$el.addClass("initVisible");



                        setTimeout(function(){
                            myEvent.trigger(myEvent.LOGIN_DONE);
                        }, 1000);



                        // start to load the data.
                    },

                    error: function(user, error){
                        console.log("error");

                        $nameForm.val("");
                        $pwdForm.val("");
                    }
                });
            }


            event.preventDefault();
        },

        resizeHandler : function(event){
            var windowHeight = window.innerHeight;
            var $mainContainer = $("#main-container")
            var marginTop = ( windowHeight - $mainContainer.height() )/2 - 40;

            this.$el.find("#login").css({"marginTop": marginTop});
        }


    });

    return LoginView;
});