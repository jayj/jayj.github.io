/* global Handlebars */
/* exported load_projects, get_project_images */


/**
 * Gets projects from JSON file
 */
function load_projects() {
    $.getJSON( 'data/projects.json', function( data ) {

        var source = $( '#projects-template' ).html();

        // Let Handlebar compile the template
        var template = Handlebars.compile(source);
        var html = template(data);

        // Add the compiled HTML to the page
        $( '#projects .container' ).append(html);

        // Create an event so run other functions can run when the projects are loaded
        $(document).triggerHandler( 'projectsLoaded' );
    })
    // Error
    // @todo create better error message
    .fail( function() {
        console.log( 'error loading projects json file' );
    });
}


/**
 * Go to the linked section again after loading projects.
 *
 * Have to do this because direct links to sections after projects
 * will end up in the middle of the projects section
 */
$(document).on( 'projectsLoaded', function() {
    var hash = window.location.href.split('#')[1];

    if ( hash ) {
        var section = document.getElementById(hash);
        section.scrollIntoView(true);
    }
});


/**
 * Show image details when clicking on the thumbnails
 */
$(document).on( 'projectsLoaded', function() {

    var thumbnails = $( '.project-thumbnails' );

    thumbnails.on( 'click', 'a', function(e) {

        var thumbnail = $(this),
            id;

        // Get the data attribute to match a thumbnail with a full size image
        id = thumbnail.data( 'image' );

        // Show the requested image and hide the rest
        $( '.project-image' ).hide();
        $( '.project-image[data-image="' + id + '"]' ).show();

        // Set active thumbnail
        thumbnails.find( '.active' ).removeClass( 'active' );
        thumbnail.addClass( 'active' );

        // Create an event so run other functions can run when an image are selected
        thumbnails.triggerHandler( 'imageSelected', thumbnail );

        e.preventDefault();
    });


    // thumbnails.on( 'click', 'a', function(e) {






    // Close the images
    // $( '.close-image' ).on( 'click', function() {
    //     $( '.project-image' ).slideUp(200);
    // });

    // Hide all images
    // $( '.project' ).on( 'mouseleave', function() {
    //     $( '.project-image' ).delay(2000).hide();
    // });
}
});



Handlebars.registerHelper('projectImagePath', function(project, image) {
    return 'images/projects/' + project + '/' + image;
});

Handlebars.registerHelper('projectThumbnailPath', function(project, image) {
    return 'images/projects/' + project + '/thumbnails/' + image;
});


Handlebars.registerHelper('previewImage', function(thumbs, name, slug, width) {
    var srcset = [];

    // Generate a comma separated string to be used in srcset
    for( var i = 0, j = thumbs.length; i < j; i++) {
        srcset.push( 'images/projects/' + slug + '/' + thumbs[i].src + ' ' + thumbs[i].size );
    }

    srcset = srcset.join( ', ' );

    // Create the image
    // Can't create an image object because it just returns [object HTMLImageElement]
    return '<img src="images/projects/' + slug + '/' + thumbs[0].src + '" srcset="' + srcset + '" width="' + width + '" alt="' + name + '" />';
});




