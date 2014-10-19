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

    _window.on( 'scroll', function() {

        var headerHeight = header.height() - nav.height();

        if ( _window.scrollTop() >= headerHeight ) {
            body.addClass( 'nav-fixed' );
        } else {
            body.removeClass( 'nav-fixed' );
        }

    });

    /**
     * Gets projects from JSON file
     */
    // (function get_projects() {
    //     $.getJSON( 'data/projects.json', function( data ) {

    //         var source = $( '#projects-template' ).html();

    //         // Let Handlebar compile the template
    //         var template = Handlebars.compile(source);
    //         var html  = template(data);

    //         // Add the compiled HTML to the page
    //         $('#projects .container').append(html);

    //         // Run the project image function after the HTML is added
    //         get_project_images();
    //     });
    // })();

    /**
     * Shows a large version of the project image when clicking on the thumbnail.
     */
    function get_project_images() {

        var thumbnails = $( '.project-thumbnails' );

        $.colorbox( '.project-thumbnails a', {
            type: 'inline',
            group: function() { return $(this).attr('data-rel'); },
            source: function() {
                return '#' + $(this).data( 'image' );
            },
            width: '100%',
            height: '100%',
            fixed: true,
            opacity: 1
        });


        thumbnails.on( 'click', 'da', function(e) {

            // Get the data attribute to match thumbnail with full size image
            var id = $(this).data( 'image' );

            // Hide all images
            $( '.project-image' ).hide();

            // Show the requested image
            $( '.project-image[data-image="' + id + '"]' ).show();

            // Set active thumbnail
            thumbnails.find( '.active' ).removeClass( 'active' );
            $(this).addClass( 'active' );

            e.preventDefault();
        });

        // Close the images
        $( '.close-image' ).on( 'click', function() {
            $.colorbox.close();
            //$( '.project-image' ).slideUp(200);
        });

        // Hide all images
        // $( '.project' ).on( 'mouseleave', function() {
        //     $( '.project-image' ).delay(2000).hide();
        // });
    }

    get_project_images();

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



// https://api.github.com/users/jayj/repos?sort=updated

//     $.get( "https://api.github.com/users/jayj", function( data ) {
// console.log(data);

//           var template = $('#template').html();
//         Mustache.parse(template);   // optional, speeds up future uses
//         var rendered = Mustache.render(template, data);
//         $('#target').html(rendered);

//     });




})( jQuery );
