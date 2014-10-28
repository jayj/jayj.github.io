/* global Handlebars */

( function( $ ) {

    var nav     = $( '.navigation' ),
        body    = $( 'body' );

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
        var headerHeight = header.outerHeight() - nav.height();

        if ( window.scrollY >= headerHeight ) {
            body.addClass( 'nav-fixed' );
        } else {
            body.removeClass( 'nav-fixed' );
        }
    }

    // Run on load and on scroll
    fixedMenu();
    $(window).on( 'scroll', fixedMenu);

})( jQuery );
