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




})( jQuery );
