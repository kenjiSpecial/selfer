/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/appData',

    'helpers/events',
    'helpers/constants'

], function ( $, _, Backbone, JST, appData, Events, constants ) {
    'use strict';

    var CreateView = Backbone.View.extend({
        template : JST['app/scripts/templates/createTemplate.ejs'],
        el       : "#main-container",

        thumbnails : {
            'homeThumbnail' : null,
            'detailThumbnail' : null,
            'detailGallery' : null,
            'listThumbnail' : null
        },

        thumbnailsName : {
            'homeThumbnail' : "null",
            'detailThumbnail' : "null",
            'detailGallery' : "null",
            'listThumbnail' : "null"
        },

        projectName    : null,
        projectType    : null,
        projectHour    : null,
        projectStart   : null,
        projectEnd     : null,
        projectBrief   : null,
        projectContent : null,


        events   : {
            "click #create-page .image-nav li": "onImageChange",
            "click #create-page .element-type li": "onTypeChange",
            "click #create-page .create-bt" : "onPost",

            "change #create-page .inputFile" : "onInputFileChange"
        },

        initialize : function(){
            _.bindAll(
                this,
                'renderView'
            );
        },

        render   : function(){

            if(!appData.get("load")){
                return;
            }

            this.html = this.template();

            //startToRender
            setTimeout(this.renderView, constants.VIEW_DURATION);
        },

        renderView : function(){
            this.$el.html(this.html);

            Events.trigger(Events.VIEW_RENDER_DONE);
        },

        onImageChange : function(event){
            var $lis = this.$el.find(".image-nav li");
            $lis.removeClass("selected");
            $(event.target).addClass("selected");

            var indexNumber = $lis.index(event.target);
            var selectClass = "select" + indexNumber;


            selectClass = selectClass + " image-gallery";
            this.$el.find(".image-gallery").attr("class", selectClass);

            return false;
        },

        onInputFileChange : function(event){
            var files = event.target.files;
            var id = $(event.target).attr("id");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                if (!file.type.match('image.*')) {
                    continue;
                }

                var thumbnailReader = new FileReader();

                thumbnailReader.onload = (function (theFile) {
                    return function (e) {

                        var imgId =  ["#" ,id , "Img"].join('');
                        console.log(imgId);
                        var imgTag = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(), '"/>'].join('');
                        //$(imgId).html(imgTag);
                        $(imgId).attr('src', e.target.result);

                        // in the future php is here...

                    };
                })(file);

                thumbnailReader.readAsDataURL(file);
                this.thumbnails[id] = file;
                this.thumbnailsName[id] = file.name;
            }
        },

        onTypeChange : function(event){
            var $lis = this.$el.find(".element-type li");
            $lis.removeClass("selected");
            $(event.target).addClass("selected");
        },

        onPost : function(){
            //alert("onPost");
            var inputNameText, hoursVal, typeVal, scheduleStartVal, scheduleEndVal, briefVal, contentVal;

            inputNameText    = this.$el.find("#input-name").val();
            hoursVal         = this.$el.find("#input-hour").val();

            scheduleStartVal = this.$el.find("#input-start-date").val();
            scheduleEndVal   = this.$el.find("#input-end-date").val();
            briefVal         = this.$el.find("#input-brief").val();
            contentVal       = this.$el.find("#input-content").val();

            this.$el.find(".type-list li").each(function(){
                if($(this).hasClass("selected")){
                    typeVal = $(this).html().toLowerCase();
                }
            });

            var Project = Parse.Object.extend("project");
            var myProject = new Project();


            myProject.save({
                name: inputNameText,

                listImage         : this.thumbnailsName['homeThumbnail'],
                timelineThumbnail : this.thumbnailsName['detailThumbnail'],
                detailGallery     : this.thumbnailsName['detailGallery'],
                detailThumbnail   : this.thumbnailsName['listThumbnail'],

                type              : typeVal,
                startDate         : scheduleStartVal,
                endDate           : scheduleEndVal,
                brief             : briefVal,
                content           : contentVal,
                user              : Parse.User.current(),
                status            : "schedule",
                hours             : { done: 0, schedule: parseInt(hoursVal) },
                ACL               : new Parse.ACL(Parse.User.current())

            }, {
                success: function (myProject) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + myProject.id);

                },
                error: function (myProject, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and description.
                    alert('Failed to create new object, with error code: ' + error.description);
                }
            });

            this.imageUpload();

        },

        imageUpload : function(){
            var formdata;
            var uploadPhoto = false;

            for(var prop in this.thumbnails){
                if(this.thumbnails[prop]){
                    console.log(this.thumbnails[prop]);
                    if (!formdata) {
                        formdata = new FormData();
                    }
                    formdata.append("images[]", this.thumbnails[prop]);
                    console.log(formdata);
                    uploadPhoto = true;
                }
            }


            if(uploadPhoto){
                console.log("test")
                $.ajax({
                    url: "php/post-image.php",
                    type: "POST",
                    data: formdata,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        //alert("success" + res);
                        //document.getElementById("response").innerHTML = res;
                        var $errorUl = $("#error-ul");

                        if (!res) {
                            // upload success
                            alert("success");
                        } else {
                            alert(res);
                            $errorUl.append(res);
                        }
                        //console.log(res);
                    }
                });
            }



        }

    });

    return CreateView;
});