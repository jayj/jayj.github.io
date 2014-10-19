
    /**
     * Gets projects from JSON file
     */
    function loadProjects() {
        $.getJSON( 'data/projects.json', function( data ) {

            var source = $( '#projects-template' ).html();

            // Let Handlebar compile the template
            var template = Handlebars.compile(source);
            var html  = template(data);

            // Add the compiled HTML to the page
            $('#projects .container').append(html);

            // Run the project image function after the HTML is added
            //get_project_images();
        });
    };

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
