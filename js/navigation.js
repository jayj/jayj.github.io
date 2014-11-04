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
        },
        onComplete: function() {
            $(document).trigger( 'navChangeComplete' );
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

        if ( _window.scrollTop() >= headerHeight ) {
            body.addClass( 'nav-fixed' );
        } else {
            body.removeClass( 'nav-fixed' );
        }
    }

    fixedMenu();

    _window.on( 'scroll', fixedMenu);


    /*
     * Set focus to the current section on the page for better accessibility
     * when using keyboard navigation.
     *
     * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
     */
    function fixSectionFocus() {
        var element = document.getElementById(location.hash.substring(1));

        if (element) {

            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }

    fixSectionFocus(); // run on page load

    _window.on( 'navChangeComplete', fixSectionFocus);


})( jQuery );
