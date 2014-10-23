/* global Handlebars */

( function( $ ) {

    var nav     = $( '.navigation' ),
        body    = $( 'body' ),
        _window = $( window );

    /**
     * Initiate the Single Page Nav plugin
     */
    nav.singlePageNav({
        offset: nav.height(),
        updateHash: true,

        // Close the navigation
        beforeStart: function() {
            body.removeClass( 'nav-toggled' );
        }
    });


    /* Toggle the navigation when clicking on the toggle button */
    $( '.toggle-nav' ).on( 'click', function() {
        body.toggleClass( 'nav-toggled' );
    });

    /* Scroll to top */
    $( 'footer').find( 'a[href="#top"]' ).on( 'click', function(e) {
        $( 'html, body' ).animate({ scrollTop: 0 }, 400 );
        e.preventDefault();
    });

    /*
     * Fixed navigation when the header is not longer visible.
     */
    var header = $( 'header[role="banner"]' );

    function fixedMenu() {
        var headerHeight = header.height() - nav.height();

        if ( _window.scrollTop() >= headerHeight ) {
            body.addClass( 'nav-fixed' );
        } else {
            body.removeClass( 'nav-fixed' );
        }
    }

    fixedMenu();

    _window.on( 'scroll', fixedMenu);

})( jQuery );


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

        // Go to the linked section again after loading projects
        // we have to do this because direct links to sections after projects
        // will end up in the middle of the projects section
        var hash = window.location.href.split('#')[1];

        if ( hash ) {
            var section = document.getElementById(hash);
            section.scrollIntoView(true);
        }

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
 * Shows a large version of the project image when clicking on the thumbnail.
 */
function get_project_images() {

    //var thumbnails = $( '.project-thumbnails' );



    });


    // thumbnails.on( 'click', 'a', function(e) {

    //     // Get the data attribute to match thumbnail with full size image
    //     var id = $(this).data( 'image' );

    //     // Hide all images
    //     $( '.project-image' ).hide();

    //     // Show the requested image
    //     $( '.project-image[data-image="' + id + '"]' ).show();

    //     // Set active thumbnail
    //     thumbnails.find( '.active' ).removeClass( 'active' );
    //     $(this).addClass( 'active' );

    //     e.preventDefault();
    // });

    // Close the images
    // $( '.close-image' ).on( 'click', function() {
    //     $( '.project-image' ).slideUp(200);
    // });

    // Hide all images
    // $( '.project' ).on( 'mouseleave', function() {
    //     $( '.project-image' ).delay(2000).hide();
    // });
}



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






// @codekit-prepend "navigation.js";
// @codekit-prepend "projects.js";


