/*global define*/

define([
    'jquery',
    'backbone',

    /** view */

    'views/navView',
    'views/homeView',
    'views/listView',
    'views/relationshipView',
    'views/createView',
    'views/loginView',
    'views/loadingView'

    /** view */

], function ( $, Backbone, NavView, HomeView, ListView, RelationshipView, CreateView, LoginView, loadingView ) {
    'use strict';

    var currentView, currentViewState;
    var homeView     = new HomeView();
    var listView     = new ListView();
    var relationView = new CreateView();
    var createView   = new CreateView();
    var loginView    = new LoginView();




    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            'list'         : 'listAction',
            'relationship' : 'relationshipAction',
            'create'       : 'createAction',
            'edit'         : 'editAction',
            'login'        : 'loginAction',
            'loading'      : 'loadingAction',
            '*actions'     : 'defaultAction'
        },

        defaultAction : function(){
            //if(currentViewState == "main") currentView.remove();
            currentView = homeView;
            currentViewState = "main";
            homeView.render();
        },

        listAction : function(){
            //if(currentViewState == "main") currentView.remove();
            currentView = listView;
            currentViewState = "main";
            listView.render();
        },

        relationshipAction : function(){
            //if(currentViewState == "main") currentView.remove();
            currentView = relationView;
            currentViewState = "main";
            relationView.render();
        },

        createAction : function(){
            //if(currentViewState == "main") currentView.remove();
            currentView = createView;
            currentViewState = "main";
            createView.render();
        },

        editAction : function(){
            console.log("editAction");
        },

        loginAction : function(){
            currentViewState = "sub";
            currentView = loadingView;
            loginView.render();
        },

        loadingAction :function(){
            //if(currentViewState == "main") currentView.remove();
            currentViewState = "sub";
            currentView = loadingView;
            loadingView.render();
        }

    });

    return ApplicationRouter;
});