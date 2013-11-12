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

    var currentView;
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
            console.log("defAction");
            homeView.render();
        },

        listAction : function(){
            console.log("listAction");
            listView.render();
        },

        relationshipAction : function(){
            console.log("relationshipAction");
            relationView.render();
        },

        createAction : function(){
            console.log("createAction");
            createView.render();
        },

        editAction : function(){
            console.log("editAction");
        },

        loginAction : function(){
            loginView.render();
        },

        loadingAction :function(){
            loadingView.render();
        }

    });

    return ApplicationRouter;
});