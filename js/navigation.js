/* global Handlebars */

( function( $ ) {


    var nav     = $( '.site-nav' ),
        body    = $( 'body' ),
        _window = $( window );


    /**
     * Initiate the Single Page Nav plugin
     */

    nav.singlePageNav({
        offset: nav.outerHeight(),
        updateHash: true
    });

    /* Scroll to top */
    $( 'footer').find( 'a[href="#top"]' ).on( 'click', function(e) {
        $( 'html, body' ).animate({ scrollTop: 0 }, 400 );
        e.preventDefault();
    });


    /*
     * Fixed navigation when the header is not longer visible.
     */
    var headerHeight = $( 'header' ).height();

    _window.on( 'scroll', function() {

        if ( _window.scrollTop() > headerHeight ) {
            body.addClass( 'nav-fixed' );
        } else {
            body.removeClass( 'nav-fixed' );
        }

    });

    /**
     * Gets projects from JSON file
     */
    (function get_projects() {
        $.getJSON( 'data/projects.json', function( data ) {

            var source = $( '#projects-template' ).html();

            // Let Handlebar compile the template
            var template = Handlebars.compile(source);
            var html  = template(data);

            // Add the compiled HTML to the page
            $('#projects .container').append(html);

        });
    })();





// https://api.github.com/users/jayj/repos?sort=updated

//     $.get( "https://api.github.com/users/jayj", function( data ) {
// console.log(data);

//           var template = $('#template').html();
//         Mustache.parse(template);   // optional, speeds up future uses
//         var rendered = Mustache.render(template, data);
//         $('#target').html(rendered);

//     });




})( jQuery );
